import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface ProfileRequest {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: Date | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}