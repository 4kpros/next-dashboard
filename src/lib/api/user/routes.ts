import {
  UserListRequest,
  UserRequest,
  UserWithEmailRequest,
  UserWithPhoneNumberRequest,
} from "@/lib/api/user/request";
import { UserListResponse, UserResponse } from "@/lib/api/user/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../base-response";
import { GenericAbortSignal } from "axios";

export async function getUser(id: number) {
  return GET<UserResponse, UserRequest>(`/users/${id}`);
}
export async function getUserList(params: UserListRequest, signal?: GenericAbortSignal) {
  return GET<UserListResponse, UserListRequest>("/users", {
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
export async function postUser(item: UserRequest) {
  if (item.addMethod === "email") {
    return postUserWithEmail({
      email: item.email,
      roleID: item.roleID,
    });
  } else {
    return postUserWithPhoneNumber({
      phoneNumber: item.phoneNumber,
      roleID: item.roleID,
    });
  }
}
async function postUserWithEmail(item: UserWithEmailRequest) {
  return POST<UserResponse, UserWithEmailRequest>(`/users/email`);
}
async function postUserWithPhoneNumber(
  item: UserWithPhoneNumberRequest
) {
  return POST<UserResponse, UserWithPhoneNumberRequest>(`/users/phone`);
}
export async function updateUser(item: UserRequest) {
  const id = item.id;
  item.id = undefined;
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
