import {
  UserListRequest,
  UserRequest,
  UserWithEmailRequest,
  UserWithPhoneNumberRequest,
} from "@/lib/api/user/request";
import { UserListResponse, UserResponse } from "@/lib/api/user/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";

export function getUser(userID: number) {
  return GET<UserResponse, number>(`/users/${userID}`);
}
export function getUserList(params: UserListRequest) {
  return GET<UserListResponse, UserListRequest>("/users", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
export function postUserWithEmail(item: UserWithEmailRequest) {
  return POST<UserResponse, UserWithEmailRequest>(`/users/email`);
}
export function postUserWithPhoneNumber(item: UserWithPhoneNumberRequest) {
  return POST<UserResponse, UserWithPhoneNumberRequest>(`/users/phone`);
}
export function updateUser(item: UserRequest) {
  return PUT<UserResponse, UserRequest>(`/users`);
}
export function deleteUser(userID: number) {
  return DELETE<UserResponse, number>(`/users/${userID}`);
}