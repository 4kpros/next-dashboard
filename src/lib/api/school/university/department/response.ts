import { SchoolResponse } from "@/lib/api/school/school/response";
import { FacultyResponse } from "../faculty/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";

export interface DepartmentResponse extends BaseResponse {
  school?: SchoolResponse;
  faculty?: FacultyResponse;
  name?: string;
  description?: string;
}

export interface DepartmentListResponse extends BasePaginatedResponse {
  data?: DepartmentResponse[];
}
