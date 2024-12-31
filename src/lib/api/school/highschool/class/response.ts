import { SchoolResponse } from "@/lib/api/school/school/response";
import { SpecialtyResponse } from "../specialty/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";

export interface ClassResponse extends BaseResponse {
  school?: SchoolResponse;
  specialty?: SpecialtyResponse;
  name?: string;
  description?: string;
}

export interface ClassListResponse extends BasePaginatedResponse {
  data?: ClassResponse[];
}
