"use client";

import { useState } from "react";
import DeleteModal from "@/components/modal/delete";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/tables/headers/default-header-info";
import DefaultTableHeader from "@/components/tables/headers/default-header";
import RolesTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormAddUpdateRole from "./components/form-add-update-role";
import {
  deleteMultipleRole,
  deleteRole,
  getRoleList,
  postRole,
  updateRole,
} from "@/lib/api/role/routes";
import { RoleRequest } from "@/lib/api/role/request";
import { RoleResponse } from "@/lib/api/role/response";
import { message, Pagination } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { HttpStatusCode } from "axios";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import {
  deleteMultipleSearchParam,
  deleteSearchParam,
  setMultipleSearchParam,
  setSearchParam,
} from "@/helpers/url/search-param";
import { SelectionRequest } from "@/lib/api/base-response";

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
  // Add role states
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
  // Update role states
  const [updateRoleModalOpen, setUpdateRoleModalOpen] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState<RoleResponse | null>(null);
  // Delete role states
  const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);

  // Ant design hooks
  const [messageApi, contextHolder] = message.useMessage();
  const toastMessage = (type: NoticeType, message: string) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "roles-data";
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
      getRoleList({
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationAdd = useMutation({
    mutationFn: (role: RoleRequest) => {
      return postRole(role);
    },
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      setAddRoleModalOpen(false);
      toastMessage("success", "Successful added role!");
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: (role: RoleRequest) => {
      return updateRole(role);
    },
    onSuccess(_data, _variables, _context) {
      setRoleToUpdate(null);
      setCanSubmitUpdate(false);
      invalidateQueries();
      setUpdateRoleModalOpen(false);
      toastMessage("success", "Successful updated role!");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: (roleID: number) => {
      return deleteRole(roleID);
    },
    onSuccess(_data, _variables, _context) {
      invalidateQueries();
      toastMessage("success", "Successful deleted role!");
    },
    onError(_error, _variables, _context) {
      toastMessage("error", "Failed to delete role!");
    },
  });
  const mutationDeleteMultiple = useMutation({
    mutationFn: (selection: SelectionRequest) => {
      return deleteMultipleRole(selection);
    },
    onSuccess(_data, _variables, _context) {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage("success", "Successful deleted role selection!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to delete role selection!");
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
      {contextHolder}
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
          onAdd={() => {
            mutationAdd.reset();
            setAddRoleModalOpen(true);
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
            setDeleteRoleModalOpen(true);
          }}
          onPrint={() => {}}
        />
        <DefaultTableHeaderInfo
          selectedItemsCount={selectedRowKeys.length}
          currentPage={query.data?.data?.pagination.currentPage ?? 0}
          totalPages={query.data?.data?.pagination.totalPages ?? 0}
        />
        <RolesTable
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
          onUpdateRequested={(value, _index) => {
            setCanSubmitUpdate(false);
            setRoleToUpdate(value);
            mutationUpdate.reset();
            setUpdateRoleModalOpen(true);
          }}
          onDeleteConfirmed={(value, _index) => {
            mutationDelete.mutate(value.id ?? -1);
          }}
        />
        <div className="w-auto mt-6">
          <Pagination
            showQuickJumper
            align="center"
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

      {/* Add new role modal */}
      <CustomModalWithoutFooter
        title="Add new role"
        content={
          <FormAddUpdateRole
            isLoading={mutationAdd.isPending}
            canSubmit={true}
            errorMessage={
              mutationAdd.isError
                ? HttpMessageFromStatus(
                    (mutationAdd.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "role name"
                  )
                : undefined
            }
            onSubmit={(item) => {
              mutationAdd.mutate(item);
            }}
            onCancel={() => setAddRoleModalOpen(false)}
          />
        }
        modalOpen={addRoleModalOpen}
        onOk={() => setAddRoleModalOpen(false)}
        onCancel={() => setAddRoleModalOpen(false)}
        maskClosable={false}
      />

      {/* Update role modal */}
      <CustomModalWithoutFooter
        title="Update role"
        content={
          <FormAddUpdateRole
            isLoading={mutationUpdate.isPending}
            canSubmit={canSubmitUpdate}
            canSubmitMessage={"Add some changes in order to update!"}
            errorMessage={
              mutationUpdate.isError
                ? HttpMessageFromStatus(
                    (mutationUpdate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "role name"
                  )
                : undefined
            }
            role={roleToUpdate}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  roleToUpdate?.name === values?.name &&
                  roleToUpdate?.feature === values?.feature &&
                  roleToUpdate?.description === values?.description
                )
              );
            }}
            onSubmit={(item) => {
              mutationUpdate.mutate({
                id: roleToUpdate?.id ?? -1,
                name: item.name,
                feature: item.feature,
                description: item.description,
              });
            }}
            onCancel={() => setUpdateRoleModalOpen(false)}
          />
        }
        modalOpen={updateRoleModalOpen}
        onOk={() => setUpdateRoleModalOpen(false)}
        onCancel={() => setUpdateRoleModalOpen(false)}
        maskClosable={false}
      />

      {/* Delete role modal */}
      <DeleteModal
        description={`Do you really want to delete all selected ${
          selectedRowKeys.length
        } selected role${
          selectedRowKeys.length > 1 ? "s" : ""
        } ? This is not a reversible action!`}
        modalOpen={deleteRoleModalOpen}
        onOk={() => {
          const tmpSelection = selectedRowKeys.map(
            (item, _index) => item as number
          );
          mutationDeleteMultiple.mutate({list: tmpSelection});
          setDeleteRoleModalOpen(false);
        }}
        onCancel={() => setDeleteRoleModalOpen(false)}
      />
    </>
  );
}
