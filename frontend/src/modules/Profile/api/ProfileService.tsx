import api from "../../../api/http";
import { AxiosResponse } from "axios";
import { IUser } from "../types/types";

export default class AuthService {
  static async userdata(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>("/get_authorized_user_data");
  }

  static async updateUserData(UpdateData: IUser) {
    return api.post("/update_user_data", UpdateData);
  }

  static async updateSocialMedia(UpdateSocialMedia: IUser) {
    return api.post("/update_social_media", UpdateSocialMedia);
  }

  static async userdatabyid(id_user: number): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>(`/user_data/${id_user}`);
  }
}
