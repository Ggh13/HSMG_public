import { makeAutoObservable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import TrainingConstructorService from "../api/TrainingConstructorService";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";
import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";
import { ExerciseFromLib, TrainingProgram } from "../types/types";
import axios from "axios";

export default class TrainingConstructorStore {
    user_trainings: GeneralProgramInformation[] = [];
    current_training: TrainingProgram = {} as TrainingProgram;
    loading = false;
    all_ex_to_choose: ExerciseFromLib[] = [];
    error: string | null = null;
    private errorStore: IErrorStore;
    isHydrated = false; // Флаг инициализации хранилища

    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'TrainingConstructorStore',
            properties: ['user_trainings', 'current_training'],
            storage: window.localStorage,
        }).then(
            action(() => {
                this.isHydrated = true;
            })
        );
    }

    private isAbortError(error: any): boolean {
        return (
            error?.name === 'AbortError' ||
            error?.message === 'canceled' ||
            axios.isCancel(error)
        );
    }

    setLoading = action((value: boolean) => {
        this.loading = value;
    });

    setUserTrainings = action((trainings: GeneralProgramInformation[] | null | undefined) => {
        this.user_trainings = Array.isArray(trainings) ? trainings : [];
    });

    setCurrentTraining = action((training: TrainingProgram) => {
        this.current_training = training && {
            ...training,
            training_days: Array.isArray(training.training_days) ? training.training_days : []
        };
    });

    setAllExToChoose = action((exercises: ExerciseFromLib[]) => {
        this.all_ex_to_choose = Array.isArray(exercises) ? exercises : [];
    });

    clearError = action(() => {
        this.error = null;
    });

    async fetchUserTrainingPrograms() {
        try {
            this.setLoading(true);
            const response = await TrainingConstructorService.getAllUserPrograms();
            this.setUserTrainings(response.data);
            console.log(response.data);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    async CreateTrainingProgram(training: TrainingProgram) {
        try {
            this.setLoading(true);
            await TrainingConstructorService.createTrainingProgram(training);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    async UpdateTrainingProgram(training: TrainingProgram) {
        try {
            this.setLoading(true);
            await TrainingConstructorService.updateTrainingProgram(training);
            await this.GetTrainingProgram(String(training.training_id));
            this.setCurrentTraining(training);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    async GetTrainingProgram(id_tr: string | null | undefined) {
        try {
            this.setLoading(true);
            const response = await TrainingConstructorService.getTrainingProgram(id_tr);
            this.setCurrentTraining(response.data);
            console.log(response.data);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    async GetAllExercisesFromLib() {
        try {
            this.setLoading(true);
            const response = await TrainingConstructorService.getAllExercisesFromLib();
            this.setAllExToChoose(response.data.exercises);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUserTrainingProgramsById(id_user: number) {
        try {
            this.setLoading(true);
            const response = await TrainingConstructorService.getUserTrainingProgramsById(id_user);
            this.setUserTrainings(response.data);
            console.log(response);
        } catch (e: any) {
            if (!this.isAbortError(e)) {
                this.errorStore.setError(e);
            }
        } finally {
            this.setLoading(false);
        }
    }




}