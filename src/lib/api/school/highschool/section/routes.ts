import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SectionListResponse, SectionResponse } from "./response";
import { SectionListRequest, SectionRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Section
export async function getSection(id: number) {
  return GET<SectionResponse, SectionRequest>(
    `/schools/highschools/sections/${id}`
  );
}
export async function getSectionList(
  params: SectionListRequest,
  signal?: GenericAbortSignal
) {
  return GET<SectionListResponse, SectionListRequest>(
    "/schools/highschools/sections",
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
export async function postSection(item: SectionRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  return POST<SectionResponse, SectionRequest>(
    `/schools/highschools/sections`,
    item
  );
}
export async function updateSection(item: SectionRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  return PUT<SectionResponse, SectionRequest>(
    `/schools/highschools/sections/${id}`,
    item
  );
}
export async function deleteSection(id: number) {
  return DELETE<SectionResponse, SectionRequest>(
    `/schools/highschools/sections/${id}`
  );
}
export async function deleteMultipleSection(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/highschools/sections/multiple/delete`,
    {
      data: selection,
    }
  );
}
