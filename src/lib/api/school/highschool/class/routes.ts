import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { ClassListResponse, ClassResponse } from "./response";
import { ClassListRequest, ClassRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Class
export async function getClass(id: number) {
  return GET<ClassResponse, ClassRequest>(
    `/schools/schools/highschool/classes/${id}`
  );
}
export async function getClassList(
  params: ClassListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ClassListResponse, ClassListRequest>(
    "/schools/highschool/classes",
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
export async function postClass(item: ClassRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  item.specialtyID = parseInt(`${item.specialtyID}`);
  return POST<ClassResponse, ClassRequest>(
    `/schools/highschool/classes`,
    item
  );
}
export async function updateClass(item: ClassRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  item.specialtyID = parseInt(`${item.specialtyID}`);
  return PUT<ClassResponse, ClassRequest>(
    `/schools/highschool/classes/${id}`,
    item
  );
}
export async function deleteClass(id: number) {
  return DELETE<ClassResponse, ClassRequest>(
    `/schools/highschool/classes/${id}`
  );
}
export async function deleteMultipleClass(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/highschool/classes/multiple/delete`,
    {
      data: selection,
    }
  );
}
