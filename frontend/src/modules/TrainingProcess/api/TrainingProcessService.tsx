import api from "@/api/http";
import { DoneExercise, Program } from "../types/types";

export default class TrainingProcessService {
  static async DoneExercise(ex: DoneExercise) {
    return api.post("/training_process/done_exercise", ex);
  }

  static async AddProgramById(id: string) {
    return api.post(`/training_process/add/${id}`);
  }

  static async GetPrograms() {
    return api.get("/training_process/get");
  }

  static async GetUserProgramById(id: string) {
    return api.get(`/training_process/get/${id}`);
  }

  static async GetProgramById(id : string) {
    return api.get(`/training_program/get/${id}`);
  }

  static async UpdateProgramById(id: string, program: Program) {
    return api.post(`/training_process/update/${id}`, program);
  }
}