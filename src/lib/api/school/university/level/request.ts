import { FilterRequest } from "@/lib/api/common/filter/request";
import { PaginationRequest } from "@/lib/api/common/pagination/request";

export interface LevelRequest {
  id?: number;
  schoolID: number;
  name: string;
  description?: string;
}

export interface LevelListRequest extends FilterRequest, PaginationRequest {
  schoolID?: number
}
