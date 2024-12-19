import { HistoryListRequest, HistoryRequest } from "@/lib/api/history/request";
import { HistoryListResponse, HistoryResponse } from "@/lib/api/history/response";
import { GET } from "@/lib/http/http";

export async function getHistory(id: number) {
  return GET<HistoryResponse, HistoryRequest>(`/history/${id}`);
}
export async function getHistoryList(params: HistoryListRequest) {
  return GET<HistoryListResponse, HistoryListRequest>("/history", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
