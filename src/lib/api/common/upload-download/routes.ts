import { GET, POST } from "@/lib/http/http";
import { DownloadRequest, UploadRequest } from "./request";
import { DownloadResponse, UploadResponse } from "./response";

export async function uploadData(pathName: string, item: UploadRequest) {
  return POST<UploadResponse, UploadRequest>(`/'${pathName}'/upload`, item);
}
export async function downloadData(pathName: string, _: DownloadRequest) {
  return GET<DownloadResponse, DownloadRequest>(`/'${pathName}'/download`);
}
