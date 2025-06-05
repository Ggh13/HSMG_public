import api from "@/api/http";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { TrainingProgram} from "../types/types";
import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";
import Api from "@/api/basehttp";

export default class TrainingConstructorService {
    static async getAllUserPrograms(config?: AxiosRequestConfig): Promise<AxiosResponse<GeneralProgramInformation[]>> {
        return api.get('/training_constructor/user_trainings', config);
    }

    static async createTrainingProgram(training: TrainingProgram, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return api.post<TrainingProgram>('/training_program/add', training, config);
    }

    static async updateTrainingProgram(training: TrainingProgram, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return api.post<TrainingProgram>('/training_program/update', training, config);
    }

    static async getTrainingProgram(id_tr: string | null | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<TrainingProgram>> {
        return Api.get(`/training_program/get/${id_tr}`, config);
    }

    static async getAllExercisesFromLib(config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return Api.get('/libraries/training_exercises/get_all', config);
    }

    static async getUserTrainingProgramsById(id_user: number): Promise<AxiosResponse> {
        return Api.get(`/training_constructor/user_trainings/${id_user}`);
    }
}