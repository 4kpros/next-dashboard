import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";

export interface HistoryResponse extends BaseResponse {
  userID?: number;
  table?: string;
  tableRowID?: number;
  action?: string;
}

export interface HistoryListResponse extends BasePaginatedResponse {
  data?: HistoryResponse[];
}
