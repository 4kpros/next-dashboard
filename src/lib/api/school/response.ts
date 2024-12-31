import { BasePaginatedResponse, BaseResponse } from "../base-response";
import { DirectorResponse } from "../director/response";

export interface SchoolResponse extends BaseResponse {
  name?: string;
  type?: string;
  info?: SchoolInfoResponse;
  config?: SchoolConfigResponse;
  directors?: DirectorResponse[];
}

export interface SchoolInfoResponse {
  fullName?: string;
  Description?: string;
  slogan?: string;

  phoneNumber1?: number;
  phoneNumber2?: number;
  phoneNumber3?: number;

  email1?: string;
  email2?: string;
  email3?: string;

  founder?: string;
  foundedAt?: Date;

  address?: string;
  locationLongitude?: string;
  locationLatitude?: string;

  logo?: string;

  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

export interface SchoolConfigResponse {
  emailDomain?: string;
}

export interface SchoolListResponse extends BasePaginatedResponse {
  data?: SchoolResponse[];
}
