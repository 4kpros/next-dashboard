import { BasePaginatedResponse, BaseResponse } from "../../common/base-response";

export interface SchoolResponse extends BaseResponse {
  name?: string | null;
  type?: string | null;
  info?: SchoolInfoResponse | null;
  config?: SchoolConfigResponse | null;
}

export interface SchoolInfoResponse {
  fullName?: string | null;
  description?: string | null;
  slogan?: string | null;

  phoneNumber1?: number | null;
  phoneNumber2?: number | null;
  phoneNumber3?: number | null;

  email1?: string | null;
  email2?: string | null;
  email3?: string | null;

  founder?: string | null;
  foundedAt?: Date | null;

  address?: string | null;
  locationLongitude?: string | null;
  locationLatitude?: string | null;

  logo?: string | null;

  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
}

export interface SchoolConfigResponse {
  emailDomain?: string | null;
}

export interface SchoolListResponse extends BasePaginatedResponse {
  data?: SchoolResponse[];
}
