import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface RoleRequest {
  id?: number;
  name: string;
  feature: string;
  description?: string | null;
}

export interface RoleListRequest extends FilterRequest, PaginationRequest {}
