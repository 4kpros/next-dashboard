import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface SchoolRequest {
  id?: number;
  name: string;
  type: string;
}

export interface SchoolListRequest extends FilterRequest, PaginationRequest {}
