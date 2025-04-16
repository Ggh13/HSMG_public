import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import ProfileService from "../api/ProfileService";
import { IUser } from "../types/types";
export default class profile_store {
  user: IUser = {
    user_id: null,
    email: "",
    name: "",
    surname: "",
    nickname: "",
    avatar: "",
    social_media: {
      telegram_url: "",
      vk_url: "",
      youtube_url: ""
    }
  };
  private errorStore: IErrorStore;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;

    makeAutoObservable(this);
    makePersistable(this, {
      name: "ProfileStore",
      properties: ["user"],
      storage: window.localStorage,
    });
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async UserData() {
    try {
      const response = await ProfileService.userdata();
      console.log(response.data);
      this.setUser(response.data);
      this.errorStore.clearError();
    } catch (e: any) {
      this.errorStore.setError(e.response?.data?.message);
    }
  }

  async UpdateUserData(UpdateData: IUser) {
    try {
      const response = await ProfileService.updateUserData(UpdateData);
      console.log(response);
      this.setUser(response.data);
      console.log(this.user);
      this.errorStore.clearError();
      return response.data;
    } catch (e: any) {
      this.errorStore.setError(e.response?.data?.message);
    }
  }

  // async GetUserDataById(user_id: number) {
  //   try {
  //     const response = await ProfileService.userdatabyid(user_id);
  //     console.log(response.data);
  //     this.setUser(response.data);
  //     this.errorStore.clearError();
  //     return response.data;
  //   } catch (e: any) {
  //     this.errorStore.setError(e.response?.data?.message);
  //   }
  // }

  async GetUserDataById(user_id: number): Promise<IUser> {
    try {
      const response = await ProfileService.userdatabyid(user_id);
      // this.setUser(response.data);
      this.errorStore.clearError();
      return response.data;
    } catch (e: any) {
      this.errorStore.setError(e.response?.data?.message);
      throw e;
    }
  }
}
