import Api from "@/api/basehttp";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ExerciseFilter, ExerciseStatistics } from "../types/types";

export default class TrainingStatisticsService {
    static async getTrainingStatistic(ex_filter: ExerciseFilter, config?: AxiosRequestConfig): Promise<AxiosResponse<ExerciseStatistics>> {
        return Api.post(`/statistic/get/exercises`, ex_filter, config)
    }

    static async getUserTrainingStatistic(id_user: number, ex_filter: ExerciseFilter): Promise<AxiosResponse<ExerciseStatistics>> {
        return Api.post(`/get_exercise_statistic/${id_user}`, ex_filter);
    }
}