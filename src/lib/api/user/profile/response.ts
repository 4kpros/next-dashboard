import { RoleResponse } from '@/lib/api/user/role/response';
import { BaseResponse } from "../../common/base-response";

export interface ProfileResponse extends BaseResponse {
  email?: string | null;
  phoneNumber?: number | null;

  loginMethod?: string | null;
  provider?: string | null;
  providerUserID?: string | null;
  isActivated?: boolean | null;
  activatedAt?: Date | null;

  role?: RoleResponse;
  info?: {
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    birthday?: Date | null;
    birthLocation?: string | null;
    address?: string | null;
    language?: string | null;
    image?: string | null;
  };
  mfa?: {
    email?: boolean | null;
    phoneNumber?: boolean | null;
    authenticator?: boolean | null;
  };
}
