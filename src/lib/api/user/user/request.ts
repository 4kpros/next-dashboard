import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface UserRequest {
  id?: number;
  email?: string;
  phoneNumber?: number;
  roleID: number;
  isActivated: boolean;

  addMethod?: string;
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

export interface UserListRequest extends FilterRequest, PaginationRequest {
  role?: string;
}
