import api from "@/api/http";
import { TrainingEntry } from "../types";
import { AxiosResponse } from "axios";

export default class TrainingProcessService {
  static async GetTrainingHistory(userId: string): Promise<AxiosResponse<TrainingEntry[]>> {
    return api.get<TrainingEntry[]>(`/history/get_exercise_history/${userId}`);
  }
}
