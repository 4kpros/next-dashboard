import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface DomainRequest {
  id?: number;
  schoolID: number;
  departmentID: number;
  name: string;
  description?: string;
}

export interface DomainListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
