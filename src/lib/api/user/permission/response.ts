import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";
import { RoleResponse } from "../role/response";

export interface PermissionResponse extends BaseResponse {
  tableName?: string;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  
  role?: RoleResponse | null;
}

export interface PermissionListResponse extends BasePaginatedResponse {
  data?: PermissionResponse[];
}
