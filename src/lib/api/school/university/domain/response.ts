import { SchoolResponse } from "@/lib/api/school/school/response";
import { DepartmentResponse } from "../department/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";

export interface DomainResponse extends BaseResponse {
  school?: SchoolResponse;
  department?: DepartmentResponse;
  name?: string;
  description?: string;
}

export interface DomainListResponse extends BasePaginatedResponse {
  data?: DomainResponse[];
}
