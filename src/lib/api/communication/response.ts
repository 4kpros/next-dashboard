import { BasePaginatedResponse, BaseResponse } from "../base-response";
import { RoleResponse } from "../role/response";

export interface CommunicationResponse extends BaseResponse {
  title?: string;
  message?: string;
  audienceType?: string;
  audienceValue?: string;
}

export interface CommunicationListResponse extends BasePaginatedResponse {
  data?: CommunicationResponse[];
}
