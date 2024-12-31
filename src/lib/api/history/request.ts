import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface HistoryRequest {
  id?: number;
}

export interface HistoryListRequest extends FilterRequest, PaginationRequest {}
