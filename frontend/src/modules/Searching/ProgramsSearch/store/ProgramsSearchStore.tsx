import { flow, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IErrorStore } from '@/modules/Errors/store/error-store/types';
import { createEmptyProgram, GeneralProgramInformation } from '../types/types';
import SearchingProgramsService from '../api/ProgramsSearchService';

export default class ProgramsSearchStore {
  results: GeneralProgramInformation[] = [];
  program: GeneralProgramInformation = createEmptyProgram();
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  private errorStore: IErrorStore;
  private abortController: AbortController | null = null;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'SearchTrainingsStore',
      properties: ['searchQuery', 'program'],
      storage: window.localStorage,
    });
  }

  setSearchQuery(value: string) {
    this.searchQuery = value;
  }

  setProgram(program: GeneralProgramInformation) {
    this.program = program;
  }

  setResults(trainings: GeneralProgramInformation[] | null | undefined) {
    if (Array.isArray(trainings)) {
      this.results = trainings;
    } else {
      this.results = [];
    }
  }
  findTrainings = flow(function* (this: ProgramsSearchStore, searchText?: string) {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
    const currentAbortController = this.abortController; // 🟰 сохраняем текущий запрос
    const query = searchText ?? this.searchQuery;

    try {
      this.loading = true;
      this.error = null;

      const response = yield SearchingProgramsService.FindTrainings(
        {
          search_bar: query,
          rating: 0,
          favourite_cnt: 0,
          id_training_type: 0,
          price_min: 0,
          price_max: 0,
          views_min: 0,
          in_training_cnt: 0,
        },
        currentAbortController.signal,
      );
      this.setResults(response.data.training_programs);
      this.errorStore.clearError();
    } catch (e: unknown) {
      if (e instanceof Error && (e.name === 'CanceledError' || e.name === 'AbortError')) {
        console.log('Запрос отменён');
        return;
      }

      let errorMessage = 'Ошибка поиска';

      if (typeof e === 'object' && e !== null) {
        const maybeResponse = e as { response?: { data?: { message?: string } } };
        if (maybeResponse.response?.data?.message) {
          errorMessage = maybeResponse.response.data.message;
        } else if (e instanceof Error && e.message) {
          errorMessage = e.message;
        }
      } else if (typeof e === 'string') {
        errorMessage = e;
      }

      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      if (this.abortController === currentAbortController) {
        this.loading = false;
      }
    }
  });

  async GetProgramInfo(program_id: number) {
    this.loading = true;
    this.error = null;
    try {
      const response = await SearchingProgramsService.GetGeneralInfoAboutTraining(program_id);
      this.setProgram(response.data);
      this.errorStore.clearError();
    } catch (e: unknown) {
      if (e instanceof Error && (e.name === 'CanceledError' || e.name === 'AbortError')) {
        console.log('Запрос отменён');
        return;
      }

      let errorMessage = 'Ошибка поиска';

      if (typeof e === 'object' && e !== null) {
        const maybeResponse = e as { response?: { data?: { message?: string } } };
        if (maybeResponse.response?.data?.message) {
          errorMessage = maybeResponse.response.data.message;
        } else if (e instanceof Error && e.message) {
          errorMessage = e.message;
        }
      } else if (typeof e === 'string') {
        errorMessage = e;
      }

      this.error = errorMessage;
      this.errorStore.setError(errorMessage);
    } finally {
      this.loading = false;
    }
  }
}
