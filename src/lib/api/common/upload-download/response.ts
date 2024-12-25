import { BaseResponse } from "../base-response";

export interface UploadResponse extends BaseResponse {
  name?: string;
}

export interface DownloadResponse extends BaseResponse {
  name?: string;
}
