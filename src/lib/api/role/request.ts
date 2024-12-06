import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface RoleRequest {
  id?: number;
  name: string;
  feature: string;
  description?: string | null;
}

export interface RoleListRequest extends FilterRequest, PaginationRequest {}
