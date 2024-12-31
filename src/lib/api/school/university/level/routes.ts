import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { LevelListResponse, LevelResponse } from "./response";
import { LevelListRequest, LevelRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Level
export async function getLevel(id: number) {
  return GET<LevelResponse, LevelRequest>(
    `/schools/universities/levels/${id}`
  );
}
export async function getLevelList(
  params: LevelListRequest,
  signal?: GenericAbortSignal
) {
  return GET<LevelListResponse, LevelListRequest>(
    "/schools/universities/levels",
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
export async function postLevel(item: LevelRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  return POST<LevelResponse, LevelRequest>(
    `/schools/universities/levels`,
    item
  );
}
export async function updateLevel(item: LevelRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  return PUT<LevelResponse, LevelRequest>(
    `/schools/universities/levels/${id}`,
    item
  );
}
export async function deleteLevel(id: number) {
  return DELETE<LevelResponse, LevelRequest>(
    `/schools/universities/levels/${id}`
  );
}
export async function deleteMultipleLevel(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/universities/levels/multiple/delete`,
    {
      data: selection,
    }
  );
}
