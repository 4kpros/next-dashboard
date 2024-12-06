import { DELETE, GET, PUT } from "@/lib/http/http";
import { ProfileLoggedResponse, ProfileResponse } from "./response";
import { ProfileRequest } from "./request";

export function getProfile() {
  return GET<ProfileResponse, undefined>(`/profile`);
}
export function getProfileLogged() {
  return GET<ProfileLoggedResponse, undefined>(`/profile/logged`);
}
export function updateProfile(item: ProfileRequest) {
  return PUT<ProfileResponse, ProfileRequest>(`/profile`);
}
export function deleteProfile() {
  return DELETE<ProfileResponse, undefined>(`/profile`);
}
