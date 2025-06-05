import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import { Achievement, BestExercise } from "../types/types";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AchievementsService from "../api/AchievementsService";

export default class AchievementsStore {
    achieve_list: Achievement[] = [];
    possible_achieve: BestExercise[] = [];
    loading = false;
    error: string | null = null;
    private errorStore: IErrorStore;



    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'AchievementsStore',
            properties: ['achieve_list'],
            storage: window.localStorage,
        });
    }

    setLoading(bool: boolean) {
        this.loading = bool;
    }

    setAchievements(achievements: Achievement[]) {
        this.achieve_list = Array.isArray(achievements) ? achievements : [];
    }

    setPossibleAchievements(achievements: any) {
        this.possible_achieve = Array.isArray(achievements) ? achievements : [];
    }

    async fetchAchievements() {
        try {
            const response = await AchievementsService.getAuthUserAchieve();
            this.setAchievements(response.data.achievements);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

    async addAchieve(achieve: Achievement) {
        try {
            await AchievementsService.addAchieve(achieve);
        } catch (e: any) {
            this.errorStore.setError(e)
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

    async deleteAchieve(id_achieve: number) {
        try {
            await AchievementsService.deleteAchieve(id_achieve);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

    async getPossibleAchieve() {
        try {
            const response = await AchievementsService.getPossibleAchieve();
            console.log(response)
            this.setPossibleAchievements(response.data.best_exercises);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

    async fetchUserAchievements(id_user: number) {
        try {
            const response = await AchievementsService.getUserAchieve(id_user);
            this.setAchievements(response.data.achievements);
            console.log(response);
        } catch (e: any) {
            this.errorStore.setError(e);
        } finally {
            this.setLoading(false);
            this.errorStore.clearError();
        }
    }

}