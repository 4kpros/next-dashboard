import { BaseResponse } from "../base-response";
import { FilterResponse } from "../filter/response";
import { PaginationResponse } from "../pagination/response";

export interface UserResponse extends BaseResponse {
  email?: string | null;
  phoneNumber?: number | null;

  loginMethod?: string | null;
  provider?: string | null;
  providerUserID?: string | null;
  isActivated?: boolean | null;

  role?: UserRoleResponse | null;
  info?: UserInfoResponse | null;
  mfa: UserMfaResponse | null;
}

export interface UserInfoResponse {
  userID?: number | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: Date | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}

export interface UserMfaResponse {
  userID?: number | null;
  email?: boolean | null;
  phoneNumber?: boolean | null;
  authenticator?: boolean | null;
}

export interface UserRoleResponse {
  userID?: number | null;
  roleID?: number | null;
}

export interface UserListResponse extends FilterResponse, PaginationResponse {
  data?: UserResponse[];
}
