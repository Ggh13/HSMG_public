// S3Service.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const S3_BUCKET = "8704c70f-c03aeba7-c79f-42d4-9cf3-e5299b186100";
const S3_BASE_URL = `https://s3.twcstorage.ru/${S3_BUCKET}`;

export default class S3Service {
  static async uploadFile(
    file: File,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    const url = `${S3_BASE_URL}/${encodeURIComponent(file.name)}`;
    return axios.put(url, file, {
      headers: { "Content-Type": file.type },
      ...config,
    });
  }

  static async deleteFile(
    filename: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    const url = `${S3_BASE_URL}/${encodeURIComponent(filename)}`;
    return axios.delete(url, config);
  }

  static getFileUrl(filename: string): string {
    return `${S3_BASE_URL}/${encodeURIComponent(filename)}`;
  }
}
