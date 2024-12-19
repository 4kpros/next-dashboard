import { BasePaginatedResponse, BaseResponse } from "../base-response";

export interface ContactResponse extends BaseResponse {
  subject?: string;
  email?: string;
  message?: string;
}

export interface ContactListResponse extends BasePaginatedResponse {
  data?: ContactResponse[];
}
