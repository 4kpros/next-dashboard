import { FilterRequest } from "../filter/request";
import { PaginationRequest } from "../pagination/request";

export interface NotificationListRequest extends FilterRequest, PaginationRequest {}
