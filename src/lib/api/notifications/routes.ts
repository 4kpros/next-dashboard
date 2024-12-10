
import { GET } from "@/lib/http/http";
import { NotificationListRequest } from "./request";
import { NotificationListResponse } from "./response";

export async function getNotificationList(params: NotificationListRequest) {
  return GET<NotificationListResponse, NotificationListRequest>("/notifications", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
