import { IErrorStore } from '@/modules/Errors/store/error-store/types';
import { TrainingEntry } from '../types';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import TrainingHistoryService from '../api/TrainingHistoryService';

export default class TrainingHistoryStore {
  loading: boolean = false;
  error: string | null = null;
  history: TrainingEntry[] = [];

  private errorStore: IErrorStore;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'TrainingHistoryStore',
      properties: ['history'],
      storage: window.localStorage,
    });
  }

  setHistory(history: TrainingEntry[]) {
    this.history = history;
  }

  async GetHistory(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = await TrainingHistoryService.GetTrainingHistory(id);
      this.setHistory(response.data);
      console.log(response.data);
    } catch (e: unknown) {
      const errorMessage = this.parseError(e);
      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
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
