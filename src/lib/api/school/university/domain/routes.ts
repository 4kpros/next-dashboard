import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { DomainListResponse, DomainResponse } from "./response";
import { DomainListRequest, DomainRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Domain
export async function getDomain(id: number) {
  return GET<DomainResponse, DomainRequest>(
    `/schools/schools/universities/domains/${id}`
  );
}
export async function getDomainList(
  params: DomainListRequest,
  signal?: GenericAbortSignal
) {
  return GET<DomainListResponse, DomainListRequest>(
    "/schools/universities/domains",
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
export async function postDomain(item: DomainRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  item.departmentID = parseInt(`${item.departmentID}`);
  return POST<DomainResponse, DomainRequest>(
    `/schools/universities/domains`,
    item
  );
}
export async function updateDomain(item: DomainRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  item.departmentID = parseInt(`${item.departmentID}`);
  return PUT<DomainResponse, DomainRequest>(
    `/schools/universities/domains/${id}`,
    item
  );
}
export async function deleteDomain(id: number) {
  return DELETE<DomainResponse, DomainRequest>(
    `/schools/universities/domains/${id}`
  );
}
export async function deleteMultipleDomain(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/universities/domains/multiple/delete`,
    {
      data: selection,
    }
  );
}
