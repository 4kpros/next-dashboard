import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { ClassListResponse, ClassResponse } from "./response";
import { ClassListRequest, ClassRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Class
export async function getClass(id: number) {
  return GET<ClassResponse, ClassRequest>(
    `/schools/schools/highschools/classes/${id}`
  );
}
export async function getClassList(
  params: ClassListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ClassListResponse, ClassListRequest>(
    "/schools/highschools/classes",
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
  item.sectionID = parseInt(`${item.sectionID}`);
  return POST<ClassResponse, ClassRequest>(
    `/schools/highschools/classes`,
    item
  );
}
export async function updateClass(item: ClassRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  item.sectionID = parseInt(`${item.sectionID}`);
  return PUT<ClassResponse, ClassRequest>(
    `/schools/highschools/classes/${id}`,
    item
  );
}
export async function deleteClass(id: number) {
  return DELETE<ClassResponse, ClassRequest>(
    `/schools/highschools/classes/${id}`
  );
}
export async function deleteMultipleClass(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/highschools/classes/multiple/delete`,
    {
      data: selection,
    }
  );
}
