import { BasePaginatedResponse, BaseResponse } from "../base-response";

export interface DirectorResponse extends BaseResponse {
  schoolID?: number;
  userID?: number;
}

export interface DirectorListResponse extends BasePaginatedResponse {
  data?: DirectorResponse[];
}
