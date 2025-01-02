import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SpecialtyListResponse, SpecialtyResponse } from "./response";
import { SpecialtyListRequest, SpecialtyRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Specialty
export async function getSpecialty(id: number) {
  return GET<SpecialtyResponse, SpecialtyRequest>(
    `/schools/schools/highschool/specialties/${id}`
  );
}
export async function getSpecialtyList(
  params: SpecialtyListRequest,
  signal?: GenericAbortSignal
) {
  return GET<SpecialtyListResponse, SpecialtyListRequest>(
    "/schools/highschool/specialties",
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
export async function postSpecialty(item: SpecialtyRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  item.sectionID = parseInt(`${item.sectionID}`);
  return POST<SpecialtyResponse, SpecialtyRequest>(
    `/schools/highschool/specialties`,
    item
  );
}
export async function updateSpecialty(item: SpecialtyRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  item.sectionID = parseInt(`${item.sectionID}`);
  return PUT<SpecialtyResponse, SpecialtyRequest>(
    `/schools/highschool/specialties/${id}`,
    item
  );
}
export async function deleteSpecialty(id: number) {
  return DELETE<SpecialtyResponse, SpecialtyRequest>(
    `/schools/highschool/specialties/${id}`
  );
}
export async function deleteMultipleSpecialty(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/highschool/specialties/multiple/delete`,
    {
      data: selection,
    }
  );
}
