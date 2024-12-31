"use client";

import { useState } from "react";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/table/headers/default-header-info";
import DefaultTableHeader from "@/components/table/headers/default-header";
import CommunicationsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateCommunication from "./components/form-add";
import {
  getCommunicationList,
  postCommunication,
} from "@/lib/api/others/communication/routes";
import { CommunicationRequest } from "@/lib/api/others/communication/request";
import { CommunicationResponse } from "@/lib/api/others/communication/response";
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
import CommunicationDetails from "./components/details";
import DownloadModal from "@/components/modal/download-modal";
import { DownloadRequest } from "@/lib/api/common/upload-download/request";
import { downloadData } from "@/lib/api/common/upload-download/routes";

export default function PageContent() {
  // React hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramPage = searchParams.get("page");
  const paramLimit = searchParams.get("limit");
  const paramSearch = searchParams.get("search");
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");
  // Add communication states
  const [addCommunicationModalOpen, setAddCommunicationModalOpen] =
    useState(false);
  // Show communication states
  const [showCommunicationModalOpen, setShowCommunicationModalOpen] =
    useState(false);
  const [communicationToShow, setCommunicationToShow] =
    useState<CommunicationResponse | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const canUpload = false;
  const canDownload = true;

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
  const queryKeyData = "communications-data";
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
      getCommunicationList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: CommunicationRequest) => postCommunication(item),
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddCommunicationModalOpen(false);
      toastMessage("success", "Successful added communication!");
    },
  });
  const mutationDownload = useMutation({
    mutationFn: async (item: DownloadRequest) =>
      downloadData("communications", item),
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
          searchKeyword={paramSearch}
          canAdd={true}
          canDeleteMultiple={true}
          canUpload={false}
          canDownload={true}
          onAdd={() => {
            mutationAdd.reset();
            setAddCommunicationModalOpen(true);
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
          onDownload={() => {
            setDownloadModalOpen(true);
          }}
        />
        <DefaultTableHeaderInfo
          showSelection={false}
          currentPage={query.data?.data?.pagination.currentPage ?? 0}
          totalPages={query.data?.data?.pagination.totalPages ?? 0}
        />
        <CommunicationsTable
          isLoading={query.isFetching}
          data={query.data?.data?.data}
          orderBy={paramOrderBy ?? undefined}
          sort={paramSort && paramSort === "asc" ? "ascend" : "descend"}
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
          onDetailsRequested={(value, _index) => {
            setCommunicationToShow(value);
            setShowCommunicationModalOpen(true);
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

      {/* Add new communication modal */}
      <CustomModalWithoutFooter
        title="Add new communication"
        content={
          <FormAddUpdateCommunication
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "communication name"
                  )
                : undefined
            }
            onSubmit={(data) => {
              mutationAdd.mutate(data);
            }}
            onCancel={() => setAddCommunicationModalOpen(false)}
          />
        }
        modalOpen={addCommunicationModalOpen}
        onOk={() => setAddCommunicationModalOpen(false)}
        onCancel={() => setAddCommunicationModalOpen(false)}
        maskClosable={false}
      />

      {/* Show communication modal */}
      <CustomModalWithoutFooter
        title="Communication details"
        content={
          <CommunicationDetails
            communication={communicationToShow}
            onClose={() => setShowCommunicationModalOpen(false)}
          />
        }
        modalOpen={showCommunicationModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowCommunicationModalOpen(false)}
        onCancel={() => setShowCommunicationModalOpen(false)}
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
                    "communication name"
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
