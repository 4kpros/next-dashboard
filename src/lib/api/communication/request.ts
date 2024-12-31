import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface CommunicationRequest {
  id?: number;
  title: number;
  message: string;
  audienceType: string;
  audienceValue: string;
}

export interface CommunicationListRequest
  extends FilterRequest,
    PaginationRequest {}
