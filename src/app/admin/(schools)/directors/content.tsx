"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import DirectorsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateDirector from "./components/form-add-update";
import {
  deleteMultipleDirector,
  deleteDirector,
  getDirectorList,
  postDirector,
  updateDirector,
} from "@/lib/api/school/director/routes";
import { DirectorRequest } from "@/lib/api/school/director/request";
import { DirectorResponse } from "@/lib/api/school/director/response";
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
import DirectorDetails from "./components/details";
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
  // Add director states
  const [addDirectorModalOpen, setAddDirectorModalOpen] = useState(false);
  // Show director states
  const [showDirectorModalOpen, setShowDirectorModalOpen] = useState(false);
  const [directorToShow, setDirectorToShow] = useState<DirectorResponse | null>(
    null
  );
  // Update director states
  const [updateDirectorModalOpen, setUpdateDirectorModalOpen] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [directorToUpdate, setDirectorToUpdate] =
    useState<DirectorResponse | null>(null);
  // Delete director states
  const [deleteDirectorModalOpen, setDeleteDirectorModalOpen] = useState(false);
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
  const queryKeyData = "directors-data";
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
      getDirectorList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: DirectorRequest) => postDirector(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddDirectorModalOpen(false);
      toastMessage("success", "Successful added director!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (item: DirectorRequest) => updateDirector(item),
    onSuccess(_data, _variables, _context) {
      setDirectorToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdateDirectorModalOpen(false);
      toastMessage("success", "Successful updated director!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (directorID: number) => deleteDirector(directorID),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted director!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete director!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      deleteMultipleDirector(selection),
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted director selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete director selection!");
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (item: UploadRequest) => uploadData("directors", item),
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
      downloadData("directors", item),
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
            setAddDirectorModalOpen(true);
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
            setDeleteDirectorModalOpen(true);
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
        <DirectorsTable
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
            setDirectorToShow(value);
            setShowDirectorModalOpen(true);
          }}
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setDirectorToUpdate(value);
            mutationUpdate.reset();
            setUpdateDirectorModalOpen(true);
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

      {/* Add new director modal */}
      <CustomModalWithoutFooter
        title="Add new director"
        content={
          <FormAddUpdateDirector
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "director name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationAdd.mutate(data);
            }}
            onCancel={() => setAddDirectorModalOpen(false)}
          />
        }
        modalOpen={addDirectorModalOpen}
        onOk={() => setAddDirectorModalOpen(false)}
        onCancel={() => setAddDirectorModalOpen(false)}
        maskClosable={false}
      />

      {/* Update director modal */}
      <CustomModalWithoutFooter
        title="Update director"
        content={
          <FormAddUpdateDirector
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "director name"
                  )
                : undefined
            }
            item={directorToUpdate}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  directorToUpdate?.user?.id === values?.userID &&
                  directorToUpdate?.school?.id === values?.schoolID
                )
              );
            }}
            onSubmit={(data) => {
              mutationUpdate.mutate({
                id: directorToUpdate?.id ?? -1,
                userID: data.userID,
                schoolID: data.schoolID,
              });
            }}
            onCancel={() => setUpdateDirectorModalOpen(false)}
          />
        }
        modalOpen={updateDirectorModalOpen}
        maskClosable={false}
        onOk={() => setUpdateDirectorModalOpen(false)}
        onCancel={() => setUpdateDirectorModalOpen(false)}
      />

      {/* Show director modal */}
      <CustomModalWithoutFooter
        title="Director details"
        content={
          <DirectorDetails
            director={directorToShow}
            onClose={() => setShowDirectorModalOpen(false)}
          />
        }
        modalOpen={showDirectorModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowDirectorModalOpen(false)}
        onCancel={() => setShowDirectorModalOpen(false)}
      />

      {/* Delete director modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected director${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deleteDirectorModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({ list: tmpSelection });
          setDeleteDirectorModalOpen(false);
        }}
        onCancel={() => setDeleteDirectorModalOpen(false)}
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
                    "director name"
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
                    "director name"
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
