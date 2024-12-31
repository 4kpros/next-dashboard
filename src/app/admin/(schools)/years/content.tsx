"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import YearsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateYear from "./components/form-add-update";
import {
  deleteMultipleYear,
  deleteYear,
  getYearList,
  postYear,
  updateYear,
} from "@/lib/api/school/year/routes";
import { YearRequest } from "@/lib/api/school/year/request";
import { YearResponse } from "@/lib/api/school/year/response";
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
import YearDetails from "./components/details";
import UploadModal from "@/components/modal/upload-modal";
import DownloadModal from "@/components/modal/download-modal";
import { formatDate } from "@/helpers/date/format";
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
  // Add year states
  const [addYearModalOpen, setAddYearModalOpen] = useState(false);
  // Show year states
  const [showYearModalOpen, setShowYearModalOpen] = useState(false);
  const [yearToShow, setYearToShow] = useState<YearResponse | null>(null);
  // Update year states
  const [updateYearModalOpen, setUpdateYearModalOpen] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [yearToUpdate, setYearToUpdate] = useState<YearResponse | null>(null);
  // Delete year states
  const [deleteYearModalOpen, setDeleteYearModalOpen] = useState(false);
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
  const queryKeyData = "years-data";
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
      getYearList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: YearRequest) => postYear(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddYearModalOpen(false);
      toastMessage("success", "Successful added year!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (item: YearRequest) => updateYear(item),
    onSuccess(_data, _variables, _context) {
      setYearToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdateYearModalOpen(false);
      toastMessage("success", "Successful updated year!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (yearID: number) => deleteYear(yearID),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted year!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete year!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      deleteMultipleYear(selection),
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted year selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete year selection!");
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (item: UploadRequest) => uploadData("years", item),
    onSuccess(_data, _variables, _context) {
      console.log(_data);
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to upload data!");
    },
  });
  const mutationDownload = useMutation({
    mutationFn: async (item: DownloadRequest) => downloadData("years", item),
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
            setAddYearModalOpen(true);
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
            setDeleteYearModalOpen(true);
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
        <YearsTable
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
            setYearToShow(value);
            setShowYearModalOpen(true);
          }}
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setYearToUpdate(value);
            mutationUpdate.reset();
            setUpdateYearModalOpen(true);
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

      {/* Add new year modal */}
      <CustomModalWithoutFooter
        title="Add new year"
        content={
          <FormAddUpdateYear
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "year name"
                  )
                : undefined
            }
            onSubmit={(item) => {
              mutationAdd.mutate(item);
            }}
            onCancel={() => setAddYearModalOpen(false)}
          />
        }
        modalOpen={addYearModalOpen}
        onOk={() => setAddYearModalOpen(false)}
        onCancel={() => setAddYearModalOpen(false)}
        maskClosable={false}
      />

      {/* Update year modal */}
      <CustomModalWithoutFooter
        title="Update year"
        content={
          <FormAddUpdateYear
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "year name"
                  )
                : undefined
            }
            item={yearToUpdate}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  formatDate(yearToUpdate?.startDate?.toString()) ===
                    formatDate(values?.startDate?.toString()) &&
                  formatDate(yearToUpdate?.endDate?.toString()) ===
                    formatDate(values?.endDate?.toString())
                )
              );
            }}
            onSubmit={(data) => {
              mutationUpdate.mutate({
                id: yearToUpdate?.id ?? -1,
                startDate: data.startDate,
                endDate: data.endDate,
              });
            }}
            onCancel={() => setUpdateYearModalOpen(false)}
          />
        }
        modalOpen={updateYearModalOpen}
        maskClosable={false}
        onOk={() => setUpdateYearModalOpen(false)}
        onCancel={() => setUpdateYearModalOpen(false)}
      />

      {/* Show year modal */}
      <CustomModalWithoutFooter
        title="Year details"
        content={
          <YearDetails
            year={yearToShow}
            onClose={() => setShowYearModalOpen(false)}
          />
        }
        modalOpen={showYearModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowYearModalOpen(false)}
        onCancel={() => setShowYearModalOpen(false)}
      />

      {/* Delete year modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected year${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deleteYearModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({ list: tmpSelection });
          setDeleteYearModalOpen(false);
        }}
        onCancel={() => setDeleteYearModalOpen(false)}
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
                    "year name"
                  )
                : undefined
            }
            onSubmit={(item) => {
              mutationUpload.mutate(item);
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
                    "year name"
                  )
                : undefined
            }
            onSubmit={(item) => {
              mutationDownload.mutate(item);
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
