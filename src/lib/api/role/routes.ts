import { RoleListRequest, RoleRequest } from "@/lib/api/role/request";
import { RoleListResponse, RoleResponse } from "@/lib/api/role/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../base-response";

export function getRole(id: number) {
  return GET<RoleResponse, RoleRequest>(`/roles/${id}`);
}
export function getRoleList(params: RoleListRequest) {
  return GET<RoleListResponse, RoleListRequest>("/roles", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
export function postRole(item: RoleRequest) {
  return POST<RoleResponse, RoleRequest>(`/roles`, item);
}
export function updateRole(item: RoleRequest) {
  const id = item.id
  item.id = undefined
  return PUT<RoleResponse, RoleRequest>(`/roles/${id}`, item);
}
export function deleteRole(id: number) {
  return DELETE<RoleResponse, RoleRequest>(`/roles/${id}`);
}
export function deleteMultipleRole(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/roles/multiple/delete`, {
    data: selection,
  });
}
