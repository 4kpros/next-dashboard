import { SchoolResponse } from "@/lib/api/school/school/response";
import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";
import { UserResponse } from "../../user/user/response";

export interface DirectorResponse extends BaseResponse {
  user?: UserResponse;
  school?: SchoolResponse;
}

export interface DirectorListResponse extends BasePaginatedResponse {
  data?: DirectorResponse[];
}
