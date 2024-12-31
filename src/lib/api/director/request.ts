import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface DirectorRequest {
  id?: number;
  schoolID: number;
  userID: number;
}

export interface DirectorListRequest extends FilterRequest, PaginationRequest {}
