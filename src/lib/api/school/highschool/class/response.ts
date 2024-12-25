import { SchoolResponse } from "@/lib/api/school/school/response";
import { SectionResponse } from "../section/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";

export interface ClassResponse extends BaseResponse {
  school?: SchoolResponse;
  section?: SectionResponse;
  name?: string;
  description?: string;
}

export interface ClassListResponse extends BasePaginatedResponse {
  data?: ClassResponse[];
}
