import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";
import { RoleResponse } from "../../user/role/response";

export interface CommunicationResponse extends BaseResponse {
  title?: string;
  message?: string;
  audienceType?: string;
  audienceValue?: string;
}

export interface CommunicationListResponse extends BasePaginatedResponse {
  data?: CommunicationResponse[];
}
