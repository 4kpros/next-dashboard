import {
  SchoolListRequest,
  SchoolRequest,
} from "@/lib/api/school/school/request";
import {
  SchoolListResponse,
  SchoolResponse,
} from "@/lib/api/school/school/response";
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../../common/base-response";
import { GenericAbortSignal } from "axios";

// School
export async function getSchool(id: number) {
  return GET<SchoolResponse, SchoolRequest>(`/schools/${id}`);
}
export async function getSchoolList(
  params: SchoolListRequest,
  signal?: GenericAbortSignal
) {
  return GET<SchoolListResponse, SchoolListRequest>("/schools", {
    params: {
      type: params.type,
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
    signal: signal,
  });
}
export async function postSchool(item: SchoolRequest) {
  item.info.phoneNumber1 = parseInt(`${item.info.phoneNumber1}`);
  item.info.phoneNumber2 = parseInt(`${item.info.phoneNumber2}`);
  item.info.phoneNumber3 = parseInt(`${item.info.phoneNumber3}`);
  return POST<SchoolResponse, SchoolRequest>(`/schools`, item);
}
export async function updateSchool(item: SchoolRequest) {
  const id = item.id;
  item.id = undefined;
  item.info.phoneNumber1 = parseInt(`${item.info.phoneNumber1}`);
  item.info.phoneNumber2 = parseInt(`${item.info.phoneNumber2}`);
  item.info.phoneNumber3 = parseInt(`${item.info.phoneNumber3}`);
  return PUT<SchoolResponse, SchoolRequest>(`/schools/${id}`, item);
}
export async function deleteSchool(id: number) {
  return DELETE<SchoolResponse, SchoolRequest>(`/schools/${id}`);
}
export async function deleteMultipleSchool(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/schools/multiple/delete`, {
    data: selection,
  });
}
