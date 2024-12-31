import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";
import { SchoolResponse } from "@/lib/api/school/school/response";

export interface FacultyResponse extends BaseResponse {
  school?: SchoolResponse;
  name?: string;
  description?: string;
}

export interface FacultyListResponse extends BasePaginatedResponse {
  data?: FacultyResponse[];
}
