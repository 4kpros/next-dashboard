"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import PermissionsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdatePermission from "./components/form-add-update";
import {
  deleteMultiplePermission,
  deletePermission,
  getPermissionList,
  updatePermission,
} from "@/lib/api/user/permission/routes";
import { PermissionRequest } from "@/lib/api/user/permission/request";
import { PermissionResponse } from "@/lib/api/user/permission/response";
import { App, Pagination } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { HttpStatusCode } from "axios";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import {
  deleteMultipleSearchParam,
  deleteSearchParam,
  setMultipleSearchParam,
  setSearchParam,
} from "@/helpers/url/search-param";
import { SelectionRequest } from "@/lib/api/common/base-response";
import PermissionDetails from "./components/details";
import UploadModal from "@/components/modal/upload-modal";
import DownloadModal from "@/components/modal/download-modal";
import {
  DownloadRequest,
  UploadRequest,
} from "@/lib/api/common/upload-download/request";
import {
  downloadData,
  uploadData,
} from "@/lib/api/common/upload-download/routes";

export default function PageContent() {
  // React hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramPage = searchParams.get("page");
  const paramLimit = searchParams.get("limit");
  const paramSearch = searchParams.get("search");
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");
  // Table row selection states
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // Add permission states
  const [addPermissionModalOpen, setAddPermissionModalOpen] = useState(false);
  // Show permission states
  const [showPermissionModalOpen, setShowPermissionModalOpen] = useState(false);
  const [permissionToShow, setPermissionToShow] =
    useState<PermissionResponse | null>(null);
  // Update permission states
  const [updatePermissionModalOpen, setUpdatePermissionModalOpen] =
    useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [permissionToUpdate, setPermissionToUpdate] =
    useState<PermissionResponse | null>(null);
  // Delete permission states
  const [deletePermissionModalOpen, setDeletePermissionModalOpen] =
    useState(false);
  // Uploads & downloads
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (type: NoticeType, message: string) => {
    messageInst.open({
      type: type,
      content: message,
    });
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "permissions-data";
  const query = useQuery({
    queryKey: [
      queryKeyData,
      paramPage,
      paramLimit,
      paramSearch,
      paramOrderBy,
      paramSort,
    ],
    queryFn: async () =>
      getPermissionList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: PermissionRequest) =>
      updatePermission(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddPermissionModalOpen(false);
      toastMessage("success", "Successful added permission!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (item: PermissionRequest) =>
      updatePermission(item),
    onSuccess(_data, _variables, _context) {
      setPermissionToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdatePermissionModalOpen(false);
      toastMessage("success", "Successful updated permission!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (permissionID: number) => deletePermission(permissionID),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted permission!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete permission!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      deleteMultiplePermission(selection),
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted permission selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete permission selection!");
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (item: UploadRequest) => uploadData("permissions", item),
    onSuccess(_data, _variables, _context) {
      console.log(_data);
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to upload data!");
    },
  });
  const mutationDownload = useMutation({
    mutationFn: async (item: DownloadRequest) =>
      downloadData("permissions", item),
    onSuccess(_data, _variables, _context) {
      console.log(_data);
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to download data!");
    },
  });
  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [
        queryKeyData,
        paramPage,
        paramLimit,
        paramSearch,
        paramOrderBy,
        paramSort,
      ],
    });
  };

  return (
    <>
      <div
        style={{
          padding: "15px",
          minHeight: "100vh",
        }}
      >
        <DefaultTableHeader
          isLoading={query.isPending}
          isFetching={query.isFetching}
          isDeletingSelection={mutationDeleteMultiple.isPending}
          selectedItemsCount={selectedRowKeys.length}
          searchKeyword={paramSearch}
          canAdd={true}
          canDeleteMultiple={true}
          canUpload={true}
          canDownload={true}
          onAdd={() => {
            mutationAdd.reset();
            setAddPermissionModalOpen(true);
          }}
          onSearch={(value, _e, info) => {
            if (info?.source === "clear") {
              return;
            }
            const newUrl = setSearchParam(
              window.location.href,
              "search",
              value
            );
            router.push(newUrl.href);
          }}
          onClearSearch={() => {
            const newUrl = deleteSearchParam(window.location.href, "search");
            router.push(newUrl.href);
          }}
          onRefresh={invalidateQueries}
          onDelete={() => {
            setDeletePermissionModalOpen(true);
          }}
          onUpload={() => {
            setUploadModalOpen(true);
          }}
          onDownload={() => {
            setDownloadModalOpen(true);
          }}
        />
        <DefaultTableHeaderInfo
          showSelection={true}
          selectedItemsCount={selectedRowKeys.length}
          currentPage={query.data?.data?.pagination.currentPage ?? 0}
          totalPages={query.data?.data?.pagination.totalPages ?? 0}
        />
        <PermissionsTable
          isLoading={
            query.isFetching ||
            mutationDelete.isPending ||
            mutationDeleteMultiple.isPending
          }
          data={query.data?.data?.data}
          orderBy={paramOrderBy ?? undefined}
          sort={paramSort && paramSort === "asc" ? "ascend" : "descend"}
          selectedRowKeys={selectedRowKeys}
          onFilterSortChanged={(filters, sorter) => {
            // If there are no filters, cleanup
            if (!(sorter as any)?.column) {
              const newUrl = deleteMultipleSearchParam(window.location.href, [
                "orderBy",
                "sort",
              ]);
              router.push(newUrl.href);
              return;
            }

            // Apply filters
            const orderBy = (sorter as any)?.columnKey as
              | string
              | null
              | undefined;
            const sort =
              ((sorter as any)?.order as string | null | undefined) === "ascend"
                ? "asc"
                : "desc";
            const newUrl = setMultipleSearchParam(window.location.href, [
              {
                param: "orderBy",
                value: `${orderBy}`,
              },
              {
                param: "sort",
                value: `${sort}`,
              },
            ]);
            router.push(newUrl.href);
          }}
          onRowSelectionChanged={(selectedRowKeys, _selectedRows, _info) => {
            setSelectedRowKeys(selectedRowKeys);
          }}
          onRowSelectionSelected={(
            _record,
            _selected,
            _selectedRows,
            _nativeEvent
          ) => {}}
          onDetailsRequested={(value, _index) => {
            setPermissionToShow(value);
            setShowPermissionModalOpen(true);
          }}
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setPermissionToUpdate(value);
            mutationUpdate.reset();
            setUpdatePermissionModalOpen(true);
          }}
          onDeleteConfirmed={(value, _index) => {
            mutationDelete.mutate(value.id ?? -1);
          }}
        />
        <div className="w-auto mt-6">
          <Pagination
            showQuickJumper
            responsive
            align="center"
            disabled={query.isFetching}
            current={query.data?.data?.pagination?.currentPage ?? 1}
            pageSize={query.data?.data?.pagination?.limit ?? 20}
            total={query.data?.data?.pagination.count ?? 0}
            onChange={(page: number, pageSize: number) => {
              const newUrl = setMultipleSearchParam(window.location.href, [
                {
                  param: "page",
                  value: `${page}`,
                },
                {
                  param: "limit",
                  value: `${pageSize}`,
                },
              ]);
              router.push(newUrl.href);
            }}
          />
        </div>
      </div>

      {/* Add new permission modal */}
      <CustomModalWithoutFooter
        title="Add new permission"
        content={
          <FormAddUpdatePermission
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "permission name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationAdd.mutate(data);
            }}
            onCancel={() => setAddPermissionModalOpen(false)}
          />
        }
        modalOpen={addPermissionModalOpen}
        onOk={() => setAddPermissionModalOpen(false)}
        onCancel={() => setAddPermissionModalOpen(false)}
        maskClosable={false}
      />

      {/* Update permission modal */}
      <CustomModalWithoutFooter
        title="Update permission"
        content={
          <FormAddUpdatePermission
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "permission name"
                  )
                : undefined
            }
            item={permissionToUpdate ?? undefined}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  ((permissionToUpdate?.role?.id?.toString() ??
                    "") as string) === ((values?.roleID ?? "") as string) &&
                  ((permissionToUpdate?.tableName ?? "") as string) ===
                    ((values?.tableName ?? "") as string) &&
                  ((permissionToUpdate?.create ?? false) as boolean) ===
                    ((values?.create ?? false) as boolean) &&
                  ((permissionToUpdate?.read ?? false) as boolean) ===
                    ((values?.read ?? false) as boolean) &&
                  ((permissionToUpdate?.update ?? false) as boolean) ===
                    ((values?.update ?? false) as boolean) &&
                  ((permissionToUpdate?.delete ?? false) as boolean) ===
                    ((values?.delete ?? false) as boolean)
                )
              );
            }}
            onSubmit={(data) => {
              mutationUpdate.mutate(data);
            }}
            onCancel={() => setUpdatePermissionModalOpen(false)}
          />
        }
        modalOpen={updatePermissionModalOpen}
        maskClosable={false}
        onOk={() => setUpdatePermissionModalOpen(false)}
        onCancel={() => setUpdatePermissionModalOpen(false)}
      />

      {/* Show permission modal */}
      <CustomModalWithoutFooter
        title="Permission details"
        content={
          <PermissionDetails
            permission={permissionToShow ?? undefined}
            onClose={() => setShowPermissionModalOpen(false)}
          />
        }
        modalOpen={showPermissionModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowPermissionModalOpen(false)}
        onCancel={() => setShowPermissionModalOpen(false)}
      />

      {/* Delete permission modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected permission${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deletePermissionModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({ list: tmpSelection });
          setDeletePermissionModalOpen(false);
        }}
        onCancel={() => setDeletePermissionModalOpen(false)}
      />

      {/* Upload data modal */}
      <CustomModalWithoutFooter
        title="Upload data"
        content={
          <UploadModal
            isLoading={mutationUpload.isPending}
            canSubmit={true}
            errorMessage={
              mutationUpload.isError
                ? HttpMessageFromStatus(
                    (mutationUpload.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "permission name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationUpload.mutate(data);
            }}
            onCancel={() => setUploadModalOpen(false)}
          />
        }
        modalOpen={uploadModalOpen}
        maskClosable={true}
        onOk={() => setUploadModalOpen(false)}
        onCancel={() => setUploadModalOpen(false)}
      />

      {/* Download data modal */}
      <CustomModalWithoutFooter
        title="Download data"
        content={
          <DownloadModal
            isLoading={mutationDownload.isPending}
            canSubmit={true}
            errorMessage={
              mutationDownload.isError
                ? HttpMessageFromStatus(
                    (mutationDownload.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "permission name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationDownload.mutate(data);
            }}
            onCancel={() => setDownloadModalOpen(false)}
          />
        }
        modalOpen={downloadModalOpen}
        maskClosable={true}
        onOk={() => setDownloadModalOpen(false)}
        onCancel={() => setDownloadModalOpen(false)}
      />
    </>
  );
}
