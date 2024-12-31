import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";

export interface YearResponse extends BaseResponse {
  name?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface YearListResponse extends BasePaginatedResponse {
  data?: YearResponse[];
}
