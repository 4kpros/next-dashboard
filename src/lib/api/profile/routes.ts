import { DELETE, GET, PUT } from "@/lib/http/http";
import { ProfileResponse } from "./response";
import { ProfileRequest } from "./request";

export async function getProfileServer(token?: string) {
  return GET<ProfileResponse, null>(`/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export async function getProfile() {
  return GET<ProfileResponse, null>(`/profile`);
}
export async function updateProfile(item: ProfileRequest) {
  return PUT<ProfileResponse, ProfileRequest>(`/profile/info`, item);
}
export async function deleteProfile() {
  return DELETE<ProfileResponse, null>(`/profile`);
}
