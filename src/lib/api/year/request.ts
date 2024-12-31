import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface YearRequest {
  id?: number;
  startDate: Date;
  endDate: Date;
}

export interface YearListRequest extends FilterRequest, PaginationRequest {}
