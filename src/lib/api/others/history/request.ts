import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface HistoryRequest {
  id?: number;
}

export interface HistoryListRequest extends FilterRequest, PaginationRequest {}
