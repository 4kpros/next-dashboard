import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface FacultyRequest {
  id?: number;
  schoolID: number;
  name: string;
  description?: string;
}

export interface FacultyListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
