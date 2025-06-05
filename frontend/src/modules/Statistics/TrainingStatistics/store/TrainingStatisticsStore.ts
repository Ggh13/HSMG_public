import { action, makeAutoObservable, runInAction } from "mobx";
import { ExerciseFilter, ExerciseStatistics } from "../types/types";
import { makePersistable } from "mobx-persist-store";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import axios from "axios";
import TrainingStatisticsService from "../api/TrainingStatisticsService";

export default class TrainingStatisticsStore {
    ex_statistics: ExerciseStatistics = <ExerciseStatistics>{};
    loading = false;
    error: string | null = null;
    private errorStore: IErrorStore;
    private abortControllers: Map<string, AbortController> = new Map();


    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'TrainingStatisticsStore',
            properties: ['ex_statistics'],
            storage: window.localStorage,
        });
    }

    private getAbortController(key: string): AbortController {
        this.cancelRequest(key);
        const controller = new AbortController();
        this.abortControllers.set(key, controller);
        return controller;
    }

    private cancelRequest(key: string) {
        const controller = this.abortControllers.get(key);
        if (controller) {
            controller.abort();
            this.abortControllers.delete(key);
        }
    }

    private isAbortError(error: any): boolean {
        return (
            error?.name === 'AbortError' ||
            error?.message === 'canceled' ||
            axios.isCancel(error) // Добавляем проверку для axios
        );
    }

    setLoading = action((value: boolean) => {
        this.loading = value;
    });

    setExerciseStatistics(stat_info: ExerciseStatistics) {
        this.ex_statistics = stat_info;
    }

    async getTrainingStatistics(ex_filter: ExerciseFilter) {
        const key = 'getTrainingStatistics';
        const controller = this.getAbortController(key);

        try {
            this.setLoading(true);
            const response = await TrainingStatisticsService.getTrainingStatistic(ex_filter, {
                signal: controller.signal
            });
            runInAction(() => {
                this.setExerciseStatistics(response.data);
            });
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                runInAction(() => {
                    this.errorStore.setError(e);
                });
            }
        } finally {
            runInAction(() => {
                this.setLoading(false);
                this.abortControllers.delete(key);
            });
            this.errorStore.clearError();
        }
    }

    async getUserTrainingStatistics(id_user: number, ex_filter: ExerciseFilter) {
        try {
            this.setLoading(true);
            const response = await TrainingStatisticsService.getUserTrainingStatistic(id_user, ex_filter);
            runInAction(() => {
                this.setExerciseStatistics(response.data);
            });
        } catch (e: any) {
            runInAction(() => {
                this.errorStore.setError(e);
            })
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
            this.errorStore.clearError();
        }
    }

    cancelAllRequests() {
        this.abortControllers.forEach(controller => controller.abort());
        this.abortControllers.clear();
    };
}