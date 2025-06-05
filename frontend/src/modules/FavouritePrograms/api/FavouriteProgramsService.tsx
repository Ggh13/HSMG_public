import api from "@/api/http";
import { AxiosResponse } from "axios";

export default class FavouriteProgramsService {
    static async addToFav(program_id: number): Promise<AxiosResponse> {
        return api.put(`/training_favourite/add/${program_id}`);
    }

    static async deleteFromFav(program_id: number): Promise<AxiosResponse> {
        return api.delete(`/training_favourite/delete/${program_id}`);
    }

    static async getFavPrograms(): Promise<AxiosResponse> {
        return api.get(`/training_favourite/get`);
    }
}