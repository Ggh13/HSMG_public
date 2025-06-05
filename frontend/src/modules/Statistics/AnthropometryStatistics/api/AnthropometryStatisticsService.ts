import Api from "@/api/basehttp";
import { AxiosResponse } from "axios";
import { AnthFilter, Anthropometry } from "../types/types";
import api from "@/api/http";

export default class AnthropometryStatisticsService {
    static async getAnthropometryStatistics(anth_filter: AnthFilter, id_user: number): Promise<AxiosResponse> {
        return Api.post(`/anthropometry/statistic/${id_user}`, anth_filter)
    }

    static async getCurrentAnthropometry(id_user: number): Promise<AxiosResponse> {
        return Api.get(`/anthropometry/${id_user}`);
    }

    static async deleteCurrentAnthropometry(): Promise<AxiosResponse> {
        return api.delete('/anthropometry/delete');
    }

    static async setCurrentAnthropometry(anth_data: Anthropometry): Promise<AxiosResponse> {
        return api.put('/anthropometry/set', anth_data);
    }
}