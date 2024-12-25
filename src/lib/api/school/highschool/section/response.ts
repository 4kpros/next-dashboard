import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/lib/api/common/base-response";
import { SchoolResponse } from "@/lib/api/school/school/response";

export interface SectionResponse extends BaseResponse {
  school?: SchoolResponse;
  name?: string;
  description?: string;
}

export interface SectionListResponse extends BasePaginatedResponse {
  data?: SectionResponse[];
}
