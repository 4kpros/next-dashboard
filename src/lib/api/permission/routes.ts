import { PermissionListRequest, PermissionRequest } from "@/lib/api/permission/request";
import { PermissionListResponse, PermissionResponse } from "@/lib/api/permission/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../base-response";

export async function getPermission(id: number) {
  return GET<PermissionResponse, PermissionRequest>(`/permissions/${id}`);
}
export async function getPermissionList(params: PermissionListRequest) {
  return GET<PermissionListResponse, PermissionListRequest>("/permissions", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
export async function postPermission(item: PermissionRequest) {
  return POST<PermissionResponse, PermissionRequest>(`/permissions`, item);
}
export async function updatePermission(item: PermissionRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<PermissionResponse, PermissionRequest>(`/permissions/${id}`, item);
}
export async function deletePermission(id: number) {
  return DELETE<PermissionResponse, PermissionRequest>(`/permissions/${id}`);
}
export async function deleteMultiplePermission(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/permissions/multiple/delete`, {
    data: selection,
  });
}
