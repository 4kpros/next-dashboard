import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { FacultyListResponse, FacultyResponse } from "./response";
import { FacultyListRequest, FacultyRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Faculty
export async function getFaculty(id: number) {
  return GET<FacultyResponse, FacultyRequest>(
    `/schools/university/faculties/${id}`
  );
}
export async function getFacultyList(
  params: FacultyListRequest,
  signal?: GenericAbortSignal
) {
  return GET<FacultyListResponse, FacultyListRequest>(
    "/schools/university/faculties",
    {
      params: {
        schoolID: params.schoolID,
        search: params.search,
        orderBy: params.orderBy,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      },
      signal: signal,
    }
  );
}
export async function postFaculty(item: FacultyRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  return POST<FacultyResponse, FacultyRequest>(
    `/schools/university/faculties`,
    item
  );
}
export async function updateFaculty(item: FacultyRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  return PUT<FacultyResponse, FacultyRequest>(
    `/schools/university/faculties/${id}`,
    item
  );
}
export async function deleteFaculty(id: number) {
  return DELETE<FacultyResponse, FacultyRequest>(
    `/schools/university/faculties/${id}`
  );
}
export async function deleteMultipleFaculty(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/university/faculties/multiple/delete`,
    {
      data: selection,
    }
  );
}
