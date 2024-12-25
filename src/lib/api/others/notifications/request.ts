import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface NotificationListRequest extends FilterRequest, PaginationRequest {}
