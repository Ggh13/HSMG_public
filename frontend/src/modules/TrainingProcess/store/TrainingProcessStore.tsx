import { IErrorStore } from '@/modules/Errors/store/error-store/types';
import {
  createEmptyDay,
  createEmptyExercise,
  createEmptyProgram,
  Day,
  DoneExercise,
  Exercise,
  Program,
  Programs,
} from '../types/types';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import TrainingProcessService from '../api/TrainingProcessService';
import { toJS } from 'mobx';

export default class TrainingProcessStore {
  programs: Programs = { training_programs: [] };
  program: Program = createEmptyProgram();
  day: Day = createEmptyDay();
  exercise: Exercise = createEmptyExercise();
  loading: boolean = false;
  error: string | null = null;
  doneExercises: DoneExercise[] = [];

  private errorStore: IErrorStore;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'TrainingProcessStore',
      properties: ['program', 'programs', 'day', 'exercise'],
      storage: window.localStorage,
    });
  }

  setPrograms(programs: Programs) {
    this.programs = programs;
  }
  setProgram(program: Program) {
    this.program = program;
  }
  setDay(day: Day) {
    this.day = day;
  }
  setExercise(exercise: Exercise) {
    this.exercise = exercise;
  }

  addDoneExercise(ex: DoneExercise) {
    this.doneExercises.push(ex);
  }
  
  clearDoneExercises() {
    this.doneExercises = [];
  }

  async SendDoneExercise(ex: DoneExercise) {
    this.loading = true;
    this.error = null;
    try {
      await TrainingProcessService.DoneExercise(ex);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
    }
  }

  async AddProgram(id: string) {
    this.loading = true;
    this.error = null;
    try {
      await TrainingProcessService.AddProgramById(id);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
    }
  }

  async GetPrograms() {
    this.loading = true;
    this.error = null;
    try {
      const response = await TrainingProcessService.GetPrograms();
      
      this.setPrograms(response.data);
      console.log(response.data);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
      console.log(this.programs);
    }
  }

  async GetUserProgram(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = await TrainingProcessService.GetUserProgramById(id);
      this.setProgram(response.data);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
    }
  }

  async GetProgram(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = await TrainingProcessService.GetProgramById(id);
      this.setProgram(response.data);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
    }
  }

  async UpdateProgram(id: string, program: Program) {
    this.loading = true;
    this.error = null;
    console.log(toJS(this.program.training_days));
    try {
      const response = await TrainingProcessService.UpdateProgramById(id, program);
      this.setProgram(response.data);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
      // this.GetPrograms();
    }
  }

  private parseError(e: unknown): string {
    if (e instanceof Error && (e.name === 'CanceledError' || e.name === 'AbortError')) {
      return 'Запрос отменён';
    }

    if (typeof e === 'object' && e !== null && 'response' in e) {
      const maybe = e as { response?: { data?: { message?: string } } };
      return maybe.response?.data?.message || 'Неизвестная ошибка';
    }

    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;

    return 'Произошла ошибка';
  }
}
