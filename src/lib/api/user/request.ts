import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface UserRequest {
  id?: number;
  email: string;
  phoneNumber: number;
  roleID: number;

  addMethod?: string;
}
export interface UserWithEmailRequest {
  email: string;
  roleID: number;
}
export interface UserWithPhoneNumberRequest {
  phoneNumber: number;
  roleID: number;
}

export interface UserInfoRequest {
  userID: number;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: Date | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}

export interface UserMfaRequest {
  userID: number;
  email?: boolean | null;
  phoneNumber?: boolean | null;
  authenticator?: boolean | null;
}

export interface UserListRequest extends FilterRequest, PaginationRequest {}
