import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

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
