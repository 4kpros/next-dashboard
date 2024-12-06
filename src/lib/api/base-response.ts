import { FilterResponse } from "./filter/response";
import { PaginationResponse } from "./pagination/response";

export interface BaseResponse {
  id?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
export interface BasePaginatedResponse {
  pagination: PaginationResponse;
  filter: FilterResponse;
}
