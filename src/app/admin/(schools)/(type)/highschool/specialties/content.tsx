"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import SpecialtyesTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateSpecialty from "./components/form-add-update";
import {
  deleteMultipleSpecialty,
  deleteSpecialty,
  getSpecialtyList,
  postSpecialty,
  updateSpecialty,
} from "@/lib/api/school/highschool/specialty/routes";
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
import SpecialtyDetails from "./components/details";
import UploadModal from "@/components/modal/upload-modal";
import DownloadModal from "@/components/modal/download-modal";
import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { SpecialtyRequest } from "@/lib/api/school/highschool/specialty/request";
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
  // Add specialty states
  const [addSpecialtyModalOpen, setAddSpecialtyModalOpen] = useState(false);
  // Show specialty states
  const [showSpecialtyModalOpen, setShowSpecialtyModalOpen] = useState(false);
  const [specialtyToShow, setSpecialtyToShow] =
    useState<SpecialtyResponse | null>(null);
  // Update specialty states
  const [updateSpecialtyModalOpen, setUpdateSpecialtyModalOpen] =
    useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [specialtyToUpdate, setSpecialtyToUpdate] =
    useState<SpecialtyResponse | null>(null);
  // Delete specialty states
  const [deleteSpecialtyModalOpen, setDeleteSpecialtyModalOpen] =
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
  const queryKeyData = "specialties-data";
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
      getSpecialtyList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: SpecialtyRequest) =>
      postSpecialty(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddSpecialtyModalOpen(false);
      toastMessage("success", "Successful added specialty!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (item: SpecialtyRequest) =>
      updateSpecialty(item),
    onSuccess(_data, _variables, _context) {
      setSpecialtyToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdateSpecialtyModalOpen(false);
      toastMessage("success", "Successful updated specialty!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (specialtyID: number) => deleteSpecialty(specialtyID),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted specialty!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete specialty!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      deleteMultipleSpecialty(selection),
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted specialty selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete specialty selection!");
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (item: UploadRequest) => uploadData("specialties", item),
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
      downloadData("specialties", item),
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
            setAddSpecialtyModalOpen(true);
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
            setDeleteSpecialtyModalOpen(true);
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
        <SpecialtyesTable
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
            setSpecialtyToShow(value);
            setShowSpecialtyModalOpen(true);
          }}
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setSpecialtyToUpdate(value);
            mutationUpdate.reset();
            setUpdateSpecialtyModalOpen(true);
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

      {/* Add new specialty modal */}
      <CustomModalWithoutFooter
        title="Add new specialty"
        content={
          <FormAddUpdateSpecialty
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "specialty name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationAdd.mutate(data);
            }}
            onCancel={() => setAddSpecialtyModalOpen(false)}
          />
        }
        modalOpen={addSpecialtyModalOpen}
        onOk={() => setAddSpecialtyModalOpen(false)}
        onCancel={() => setAddSpecialtyModalOpen(false)}
        maskClosable={false}
      />

      {/* Update specialty modal */}
      <CustomModalWithoutFooter
        title="Update specialty"
        content={
          <FormAddUpdateSpecialty
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "specialty name"
                  )
                : undefined
            }
            item={specialtyToUpdate}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  specialtyToUpdate?.school?.id === values?.schoolID &&
                  specialtyToUpdate?.section?.id === values?.sectionID &&
                  specialtyToUpdate?.name === values?.name &&
                  specialtyToUpdate?.description === values?.description
                )
              );
            }}
            onSubmit={(data) => {
              mutationUpdate.mutate({
                id: specialtyToUpdate?.id ?? -1,
                schoolID: data.schoolID,
                sectionID: data.sectionID,
                name: data.name,
                description: data.description,
              });
            }}
            onCancel={() => setUpdateSpecialtyModalOpen(false)}
          />
        }
        modalOpen={updateSpecialtyModalOpen}
        maskClosable={false}
        onOk={() => setUpdateSpecialtyModalOpen(false)}
        onCancel={() => setUpdateSpecialtyModalOpen(false)}
      />

      {/* Show specialty modal */}
      <CustomModalWithoutFooter
        title="Specialty details"
        content={
          <SpecialtyDetails
            item={specialtyToShow}
            onClose={() => setShowSpecialtyModalOpen(false)}
          />
        }
        modalOpen={showSpecialtyModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowSpecialtyModalOpen(false)}
        onCancel={() => setShowSpecialtyModalOpen(false)}
      />

      {/* Delete specialty modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected specialty${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deleteSpecialtyModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({ list: tmpSelection });
          setDeleteSpecialtyModalOpen(false);
        }}
        onCancel={() => setDeleteSpecialtyModalOpen(false)}
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
                    "specialty name"
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
                    "specialty name"
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