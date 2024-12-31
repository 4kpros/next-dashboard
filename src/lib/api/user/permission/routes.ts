import {
  PermissionListRequest,
  PermissionRequest,
} from "@/lib/api/user/permission/request";
import {
  PermissionListResponse,
  PermissionResponse,
} from "@/lib/api/user/permission/response";
import { DELETE, GET, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../../common/base-response";

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
export async function updatePermission(item: PermissionRequest) {
  const id = item.roleID;
  item.roleID = undefined;
  item.create = item.create === true;
  item.read = item.read === true;
  item.update = item.update === true;
  item.delete = item.delete === true;
  return PUT<PermissionResponse, PermissionRequest>(
    `/permissions/role/${id}`,
    item
  );
}
export async function deletePermission(id: number) {
  return DELETE<PermissionResponse, PermissionRequest>(`/permissions/${id}`);
}
export async function deleteMultiplePermission(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/permissions/multiple/delete`, {
    data: selection,
  });
}
