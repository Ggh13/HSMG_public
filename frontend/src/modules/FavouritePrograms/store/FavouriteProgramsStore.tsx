import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import FavouriteProgramsService from "../api/FavouriteProgramsService";

export default class FavouriteProgramsStore {
    fav_programs: GeneralProgramInformation[] = [];
    loading: boolean = true;
    error: string | null = null;
    private errorStore: IErrorStore;

    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'FavouriteProgramsStore',
            properties: ["fav_programs"],
            storage: window.localStorage,
        });
    }

    setLoading = action((value: boolean) => {
        this.loading = value;
    });
    setFavPrograms(programs: GeneralProgramInformation[] | null | undefined) {
        if (Array.isArray(programs)) {
            this.fav_programs = programs;
        } else {
            this.fav_programs = [];
        }
    }

    async fetchFavouritePrograms() {
        try {
            const response = await FavouriteProgramsService.getFavPrograms();
            console.log(response);
            this.setFavPrograms(response.data)
        } catch (e: any) {
            this.errorStore.setError(e)
        } finally {
            this.setLoading(false)
            this.errorStore.clearError();
        }
    }

    async deleteFromFav(program_id: number) {
        try {
            await FavouriteProgramsService.deleteFromFav(program_id);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

    async addToFav(program_id: number) {
        try {
            await FavouriteProgramsService.addToFav(program_id);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }
}