import { RoleListRequest, RoleRequest } from "@/lib/api/role/request";
import { RoleListResponse, RoleResponse } from "@/lib/api/role/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../base-response";
import { GenericAbortSignal } from "axios";

export async function getRole(id: number) {
  return GET<RoleResponse, RoleRequest>(`/roles/${id}`);
}
export async function getRoleList(
  params: RoleListRequest,
  signal?: GenericAbortSignal
) {
  return GET<RoleListResponse, RoleListRequest>("/roles", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
    signal: signal,
  });
}
export async function postRole(item: RoleRequest) {
  return POST<RoleResponse, RoleRequest>(`/roles`, item);
}
export async function updateRole(item: RoleRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<RoleResponse, RoleRequest>(`/roles/${id}`, item);
}
export async function deleteRole(id: number) {
  return DELETE<RoleResponse, RoleRequest>(`/roles/${id}`);
}
export async function deleteMultipleRole(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/roles/multiple/delete`, {
    data: selection,
  });
}
