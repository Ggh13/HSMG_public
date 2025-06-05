// S3Store.ts
import { makeAutoObservable, runInAction } from "mobx";
import S3Service from "../api/S3Service";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";

export default class S3Store {
  file: File | null = null;
  fileUrl: string | null = null;
  loading = false;
  error: string | null = null;
  private errorStore: IErrorStore;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;
    makeAutoObservable(this);
  }

  setFile(file: File | null) {
    this.file = file;
    this.fileUrl = null;
    this.error = null;
  }

  async uploadFile() {
    if (!this.file) return;

    this.loading = true;
    this.error = null;

    try {
      await S3Service.uploadFile(this.file);
      runInAction(() => {
        this.fileUrl = S3Service.getFileUrl(this.file!.name);
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorStore.setError(e);
        this.error = "Ошибка загрузки файла";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
      this.errorStore.clearError();
    }
  }

  async deleteFile() {
    if (!this.file) return;

    this.loading = true;
    this.error = null;

    try {
      await S3Service.deleteFile(this.file.name);
      runInAction(() => {
        this.file = null;
        this.fileUrl = null;
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorStore.setError(e);
        this.error = "Ошибка удаления файла";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
      this.errorStore.clearError();
    }
  }
}
