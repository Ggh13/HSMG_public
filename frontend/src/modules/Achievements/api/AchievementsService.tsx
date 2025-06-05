import api from "@/api/http";
import { AxiosResponse } from "axios";
import { Achievement } from "../types/types";
import Api from "@/api/basehttp";

export default class AchievementsService{
    static async getAuthUserAchieve(): Promise<AxiosResponse> {
        return api.get('/achievement/get');
    }

    static async addAchieve(achieve: Achievement): Promise<AxiosResponse> {
        return api.post('/achievement/create', achieve);
    }

    static async deleteAchieve(id_achieve: number): Promise<AxiosResponse> {
        return api.delete(`/achievement/delete/${id_achieve}`);
    }

    static async getPossibleAchieve(): Promise<AxiosResponse> {
        return api.get('/achievements/best_aproaches');
    }

    static async getUserAchieve(id_user: number): Promise<AxiosResponse> {
        return Api.get(`/achievement/get/${id_user}`);
    }
}