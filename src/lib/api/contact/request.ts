import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface ContactRequest {
  id?: number;
  subject: string;
  email: string;
  message: string;
}

export interface ContactListRequest extends FilterRequest, PaginationRequest {}
