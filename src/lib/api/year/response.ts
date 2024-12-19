import { BasePaginatedResponse, BaseResponse } from "../base-response";

export interface YearResponse extends BaseResponse {
  startDate?: Date;
  endDate?: Date;
}

export interface YearListResponse extends BasePaginatedResponse {
  data?: YearResponse[];
}
