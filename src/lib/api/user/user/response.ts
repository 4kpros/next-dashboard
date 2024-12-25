import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";
import { RoleResponse } from "../role/response";

export interface UserResponse extends BaseResponse {
  email?: string | null;
  phoneNumber?: number | null;

  loginMethod?: string | null;
  provider?: string | null;
  providerUserID?: string | null;
  isActivated?: boolean | null;
  activatedAt?: Date | null;

  role?: RoleResponse | null;
  info?: UserInfoResponse | null;
  mfa: UserMfaResponse | null;
}

export interface UserInfoResponse {
  userID?: number | null;
  gender?: string | null;
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

export interface UserListResponse extends BasePaginatedResponse {
  data?: UserResponse[];
}
