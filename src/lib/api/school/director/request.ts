import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface DirectorRequest {
  id?: number;
  schoolID: number;
  userID: number;
}

export interface DirectorListRequest extends FilterRequest, PaginationRequest {}
