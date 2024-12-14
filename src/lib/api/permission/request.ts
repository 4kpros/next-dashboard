import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface PermissionRequest {
  id?: number;
  roleID: number;
  tableName: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete?: boolean;
}

export interface PermissionListRequest extends FilterRequest, PaginationRequest {}
