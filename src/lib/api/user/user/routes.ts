import { UserListRequest, UserRequest } from "@/lib/api/user/user/request";
import { UserListResponse, UserResponse } from "@/lib/api/user/user/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../../common/base-response";
import { GenericAbortSignal } from "axios";

export async function getUser(id: number) {
  return GET<UserResponse, UserRequest>(`/users/${id}`);
}
export async function getUserList(
  params: UserListRequest,
  signal?: GenericAbortSignal
) {
  return GET<UserListResponse, UserListRequest>("/users", {
    params: {
      role: params.role,
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
    signal: signal,
  });
}
export async function postUser(item: UserRequest) {
  const newItem = item;
  newItem.roleID = parseInt(`${item.roleID}`);
  if (item.addMethod === "email") {
    newItem.addMethod = undefined;
    return postUserWithEmail(newItem);
  } else {
    newItem.addMethod = undefined;
    newItem.phoneNumber = parseInt(`${item.phoneNumber}`);
    return postUserWithPhoneNumber(newItem);
  }
}
async function postUserWithEmail(item: UserRequest) {
  return POST<UserResponse, UserRequest>(`/users/email`, item);
}
async function postUserWithPhoneNumber(item: UserRequest) {
  return POST<UserResponse, UserRequest>(`/users/phone`, item);
}
export async function updateUser(item: UserRequest) {
  const id = item.id;
  item.id = undefined;
  item.roleID = parseInt(`${item.roleID}`);
  item.phoneNumber = parseInt(`${item.phoneNumber}`);
  return PUT<UserResponse, UserRequest>(`/users/${id}`, item);
}
export async function deleteUser(id: number) {
  return DELETE<UserResponse, UserRequest>(`/users/${id}`);
}
export async function deleteMultipleUser(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/users/multiple/delete`, {
    data: selection,
  });
}
