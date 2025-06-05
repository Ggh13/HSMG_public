import api from "@/api/http";
import { AxiosResponse } from "axios";
import {
  ProgramFilter,
  GeneralProgramInformation,
  ProgramsResponse,
} from "../types/types";

export default class SearchingProgramsService {
  static async GetGeneralInfoAboutTraining(program_id: number): Promise<
    AxiosResponse<GeneralProgramInformation>
  > {
    return api.get<GeneralProgramInformation>(`/searching_training/get/${program_id}`);
  }

  static async FindTrainings(
    filter: ProgramFilter,
    signal?: AbortSignal
  ): Promise<AxiosResponse<ProgramsResponse>> {
    return api.post("/searching_training/find", filter, { signal });
  }
}
