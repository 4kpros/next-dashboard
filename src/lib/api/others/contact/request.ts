import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface ContactRequest {
  id?: number;
  subject: string;
  email: string;
  message: string;
}

export interface ContactListRequest extends FilterRequest, PaginationRequest {}
