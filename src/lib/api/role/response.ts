import { BasePaginatedResponse, BaseResponse } from "../base-response";

export interface RoleResponse extends BaseResponse {
  name?: string;
  feature?: string;
  description?: string;
}

export interface RoleListResponse extends BasePaginatedResponse {
  data?: RoleResponse[];
}
