import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface DepartmentRequest {
  id?: number;
  schoolID: number;
  facultyID: number;
  name: string;
  description?: string;
}

export interface DepartmentListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
