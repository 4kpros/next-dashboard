import { CommunicationListRequest, CommunicationRequest } from "@/lib/api/communication/request";
import { CommunicationListResponse, CommunicationResponse } from "@/lib/api/communication/response";
import { DELETE, GET, POST } from "@/lib/http/http";
import { SelectionRequest } from "../base-response";

export async function getCommunication(id: number) {
  return GET<CommunicationResponse, CommunicationRequest>(`/communications/${id}`);
}
export async function getCommunicationList(params: CommunicationListRequest) {
  return GET<CommunicationListResponse, CommunicationListRequest>("/communications", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
export async function postCommunication(item: CommunicationRequest) {
  return POST<CommunicationResponse, CommunicationRequest>(`/communications`, item);
}
export async function deleteCommunication(id: number) {
  return DELETE<CommunicationResponse, CommunicationRequest>(`/communications/${id}`);
}
export async function deleteMultipleCommunication(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`/communications/multiple/delete`, {
    data: selection,
  });
}
