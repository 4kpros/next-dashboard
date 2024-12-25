import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface PermissionRequest {
  id?: number;
  roleID?: string;
  tableName: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete?: boolean;
}

export interface PermissionListRequest extends FilterRequest, PaginationRequest {}
