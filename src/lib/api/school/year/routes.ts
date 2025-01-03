import { YearListRequest, YearRequest } from "@/lib/api/school/year/request";
import { YearListResponse, YearResponse } from "@/lib/api/school/year/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../../common/base-response";
import { GenericAbortSignal } from "axios";

export async function getYear(id: number) {
  return GET<YearResponse, YearRequest>(`/schools/years/${id}`);
}
export async function getYearList(params: YearListRequest, signal?: GenericAbortSignal) {
  return GET<YearListResponse, YearListRequest>("/schools/years", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
    signal: signal,
  });
}
export async function postYear(item: YearRequest) {
  return POST<YearResponse, YearRequest>(`/schools/years`, item);
}
export async function updateYear(item: YearRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<YearResponse, YearRequest>(`/schools/years/${id}`, item);
}
export async function deleteYear(id: number) {
  return DELETE<YearResponse, YearRequest>(`/schools/years/${id}`);
}
export async function deleteMultipleYear(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/schools/years/multiple/delete`, {
    data: selection,
  });
}
