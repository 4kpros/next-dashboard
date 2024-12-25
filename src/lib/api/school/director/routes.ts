
import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { SelectionRequest } from "../../common/base-response";
import { GenericAbortSignal } from "axios";
import { DirectorListResponse, DirectorResponse } from "./response";
import { DirectorListRequest, DirectorRequest } from "./request";
import { SchoolListRequest } from "../school/request";

// Director
export async function getDirector(id: number) {
  return GET<DirectorResponse, DirectorRequest>(`/schools/directors/${id}`);
}
export async function getDirectorList(params: SchoolListRequest, signal?: GenericAbortSignal) {
  return GET<DirectorListResponse, DirectorListRequest>("/directors", {
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
export async function postDirector(item: DirectorRequest) {
  item.userID = parseInt(`${item.userID}`);
  item.schoolID = parseInt(`${item.schoolID}`);
  return POST<DirectorResponse, DirectorRequest>(`/directors`, item);
}
export async function updateDirector(item: DirectorRequest) {
  const id = item.id;
  item.id = undefined;
  item.userID = parseInt(`${item.userID}`);
  item.schoolID = parseInt(`${item.schoolID}`);
  return PUT<DirectorResponse, DirectorRequest>(`/directors/${id}`, item);
}
export async function deleteDirector(id: number) {
  return DELETE<DirectorResponse, DirectorRequest>(`/directors/${id}`);
}
export async function deleteMultipleDirector(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/directors/multiple/delete`, {
    data: selection,
  });
}
