import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface SpecialtyRequest {
  id?: number;
  schoolID: number;
  sectionID: number;
  name: string;
  description?: string;
}

export interface SpecialtyListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
