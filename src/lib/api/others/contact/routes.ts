import { ContactListRequest, ContactRequest } from "@/lib/api/others/contact/request";
import { ContactListResponse, ContactResponse } from "@/lib/api/others/contact/response";
import { GET, POST } from "@/lib/http/http";

export async function getContact(id: number) {
  return GET<ContactResponse, ContactRequest>(`/contacts/${id}`);
}
export async function getContactList(params: ContactListRequest) {
  return GET<ContactListResponse, ContactListRequest>("/contacts", {
    params: {
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}
export async function postContact(item: ContactRequest) {
  return POST<ContactResponse, ContactRequest>(`/contacts`, item);
}
