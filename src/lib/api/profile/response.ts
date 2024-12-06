import { BaseResponse } from "../base-response";

export interface ProfileResponse extends BaseResponse {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: Date | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}

export interface ProfileLoggedResponse {
  loginMethod?: string | null;
  provider?: string | null;
  role?: string | null;
  feature?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  image?: string | null;
}
