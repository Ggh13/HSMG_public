import { makeAutoObservable, action, runInAction } from "mobx";
import { AnthFilter, Anthropometry } from "../types/types";
import { makePersistable } from "mobx-persist-store";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import AnthropometryStatisticsService from "../api/AnthropometryStatisticsService";

export default class AnthropometryStatisticsStore {
    current_anth: Anthropometry = {} as Anthropometry;
    anth_stat: Anthropometry[] = [];
    loading: boolean = false;
    error: string | null = null;
    private errorStore: IErrorStore;

    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;
        makeAutoObservable(this, {
            setAnthStat: action,
            setAnth: action,
            getAnthStatistics: action.bound,
            getUserAnth: action.bound,
            deleteUserAnth: action.bound,
            setUserAnth: action.bound,
        });
        makePersistable(this, {
            name: 'AnthropometryStatisticsStore',
            properties: ['anth_stat'],
            storage: window.localStorage,
        });
    }

    setAnthStat = (statistics: Anthropometry[]) => {
        this.anth_stat = Array.isArray(statistics) ? statistics : [];
    }

    setAnth = (anthropometry: Anthropometry) => {
        this.current_anth = anthropometry;
    }

    getAnthStatistics = async (anth_filter: AnthFilter, id_user: number) => {
        try {
            runInAction(() => {
                this.loading = true;
                this.errorStore.clearError();
            });
            const response = await AnthropometryStatisticsService.getAnthropometryStatistics(anth_filter, id_user);
            console.log(response);
            this.setAnthStat(response.data.anthropomery_stat);
        } catch (e: any) {
            this.errorStore.setError(e);
            console.log(e);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getUserAnth = async (id_user: number) => {
        try {
            runInAction(() => {
                this.loading = true;
                this.errorStore.clearError();
            });
            const response = await AnthropometryStatisticsService.getCurrentAnthropometry(id_user);
            this.setAnth(response.data);
        } catch (e: any) {
            console.log(e);
            this.errorStore.setError(e);
            this.error = e.message;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteUserAnth = async () => {
        try {
            runInAction(() => {
                this.loading = true;
                this.errorStore.clearError();
            });
            const response = await AnthropometryStatisticsService.deleteCurrentAnthropometry();
            if (response?.status === 203) {
                if (response.data == "Non-Authoritative Information") {
                    this.errorStore.setError("Отсутствуют данные для удаления");
                    this.error = "Отсутствуют данные для удаления";
                }
                else {
                    this.errorStore.setError("Удаление невозможно. Прошло более 24 часов с момента последнего изменения антропометрии");
                    this.error = "Удаление невозможно. Прошло более 24 часов с момента последнего изменения антропометрии";
                }
            }
        } catch (e: any) {
            console.log(e)
            this.errorStore.setError(e);
            this.error = e.message;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    setUserAnth = async (anth_data: Anthropometry) => {
        console.log(anth_data);
        try {
            runInAction(() => {
                this.loading = true;
                this.errorStore.clearError();
            });
            const response = await AnthropometryStatisticsService.setCurrentAnthropometry(anth_data);
             if (response?.status === 203) {
                console.log(response);
                if (response.data == "Non-Authoritative Information") {
                    this.errorStore.setError("Невозможно изменить антропометрию, сначала удалите предыдущие замеры");
                    this.error = "Невозможно изменить антропометрию, сначала удалите предыдущие замеры";
                }
                else {
                    this.errorStore.setError("Редактирование невозможно");
                    this.error = "Редактирование невозможно";
                }
            }
        } catch (e: any) {
            this.errorStore.setError(e.message);
            this.error = e.message;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}