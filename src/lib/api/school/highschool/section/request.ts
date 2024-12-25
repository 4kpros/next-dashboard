import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface SectionRequest {
  id?: number;
  schoolID: number;
  name: string;
  description?: string;
}

export interface SectionListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
