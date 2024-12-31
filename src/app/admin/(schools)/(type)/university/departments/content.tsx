"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import DepartmentsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateDepartment from "./components/form-add-update";
import {
  deleteMultipleDepartment,
  deleteDepartment,
  getDepartmentList,
  postDepartment,
  updateDepartment,
} from "@/lib/api/school/university/department/routes";
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
import DepartmentDetails from "./components/details";
import UploadModal from "@/components/modal/upload-modal";
import DownloadModal from "@/components/modal/download-modal";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { DepartmentRequest } from "@/lib/api/school/university/department/request";
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
  // Add department states
  const [addDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);
  // Show department states
  const [showDepartmentModalOpen, setShowDepartmentModalOpen] = useState(false);
  const [departmentToShow, setDepartmentToShow] =
    useState<DepartmentResponse | null>(null);
  // Update department states
  const [updateDepartmentModalOpen, setUpdateDepartmentModalOpen] =
    useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [departmentToUpdate, setDepartmentToUpdate] =
    useState<DepartmentResponse | null>(null);
  // Delete department states
  const [deleteDepartmentModalOpen, setDeleteDepartmentModalOpen] =
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
  const queryKeyData = "departments-data";
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
      getDepartmentList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: DepartmentRequest) =>
      postDepartment(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddDepartmentModalOpen(false);
      toastMessage("success", "Successful added department!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (item: DepartmentRequest) =>
      updateDepartment(item),
    onSuccess(_data, _variables, _context) {
      setDepartmentToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdateDepartmentModalOpen(false);
      toastMessage("success", "Successful updated department!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (departmentID: number) => deleteDepartment(departmentID),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted department!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete department!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      deleteMultipleDepartment(selection),
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted department selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete department selection!");
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (item: UploadRequest) => uploadData("departments", item),
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
      downloadData("departments", item),
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
            setAddDepartmentModalOpen(true);
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
            setDeleteDepartmentModalOpen(true);
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
        <DepartmentsTable
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
            setDepartmentToShow(value);
            setShowDepartmentModalOpen(true);
          }}
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setDepartmentToUpdate(value);
            mutationUpdate.reset();
            setUpdateDepartmentModalOpen(true);
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

      {/* Add new department modal */}
      <CustomModalWithoutFooter
        title="Add new department"
        content={
          <FormAddUpdateDepartment
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "department name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationAdd.mutate(data);
            }}
            onCancel={() => setAddDepartmentModalOpen(false)}
          />
        }
        modalOpen={addDepartmentModalOpen}
        onOk={() => setAddDepartmentModalOpen(false)}
        onCancel={() => setAddDepartmentModalOpen(false)}
        maskClosable={false}
      />

      {/* Update department modal */}
      <CustomModalWithoutFooter
        title="Update department"
        content={
          <FormAddUpdateDepartment
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "department name"
                  )
                : undefined
            }
            item={departmentToUpdate}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  departmentToUpdate?.school?.id === values?.schoolID &&
                  departmentToUpdate?.faculty?.id === values?.facultyID &&
                  departmentToUpdate?.name === values?.name &&
                  departmentToUpdate?.description === values?.description
                )
              );
            }}
            onSubmit={(data) => {
              mutationUpdate.mutate({
                id: departmentToUpdate?.id ?? -1,
                schoolID: data.schoolID,
                facultyID: data.facultyID,
                name: data.name,
                description: data.description,
              });
            }}
            onCancel={() => setUpdateDepartmentModalOpen(false)}
          />
        }
        modalOpen={updateDepartmentModalOpen}
        maskClosable={false}
        onOk={() => setUpdateDepartmentModalOpen(false)}
        onCancel={() => setUpdateDepartmentModalOpen(false)}
      />

      {/* Show department modal */}
      <CustomModalWithoutFooter
        title="Department details"
        content={
          <DepartmentDetails
            item={departmentToShow}
            onClose={() => setShowDepartmentModalOpen(false)}
          />
        }
        modalOpen={showDepartmentModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowDepartmentModalOpen(false)}
        onCancel={() => setShowDepartmentModalOpen(false)}
      />

      {/* Delete department modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected department${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deleteDepartmentModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({ list: tmpSelection });
          setDeleteDepartmentModalOpen(false);
        }}
        onCancel={() => setDeleteDepartmentModalOpen(false)}
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
                    "department name"
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
                    "department name"
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
