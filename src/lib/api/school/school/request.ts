import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface SchoolRequest {
  id?: number;
  name: string;
  type: string;
  config: SchoolConfigRequest;
  info: SchoolInfoRequest;
}

export interface SchoolConfigRequest {
  emailDomain?: string;
}

export interface SchoolInfoRequest {
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

export interface SchoolListRequest extends FilterRequest, PaginationRequest {
  type?: string;
}
