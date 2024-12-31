import dayjs from "dayjs";
import { FilterRequest } from "../../common/filter/request";
import { PaginationRequest } from "../../common/pagination/request";

export interface YearRequest {
  id?: number;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

export interface YearListRequest extends FilterRequest, PaginationRequest {}
