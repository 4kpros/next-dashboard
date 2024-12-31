import { BasePaginatedResponse, BaseResponse } from "../base-response";

export interface NotificationResponse extends BaseResponse {
  userID?: string;
  title?: string;
  description?: string;
}

export interface NotificationListResponse extends BasePaginatedResponse {
  data?: NotificationResponse[];
}
