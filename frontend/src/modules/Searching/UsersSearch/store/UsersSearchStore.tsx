import { flow, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IErrorStore } from '@/modules/Errors/store/error-store/types';
import { UserInformation } from '../types/types';
import SearchingUsersService from '../api/UsersSearchService';

export default class UsersSearchStore {
  results: UserInformation[] = [];
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  private errorStore: IErrorStore;
  private abortController: AbortController | null = null;

  constructor(errorStore: IErrorStore) {
    this.errorStore = errorStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UsersSearchStore',
      properties: ['results', 'searchQuery'],
      storage: window.localStorage,
    });
  }

  setSearchQuery(value: string) {
    this.searchQuery = value;
  }

  setResults(users: UserInformation[] | null | undefined) {
    if (Array.isArray(users)) {
      this.results = users;
    } else {
      this.results = [];
    }
  }
  findUsers = flow(function* (this: UsersSearchStore, searchText?: string) {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
    const currentAbortController = this.abortController;
    const query = searchText ?? this.searchQuery;

    try {
      this.loading = true;
      this.error = null;

      const response = yield SearchingUsersService.FindUsers(
        {
          search_bar: query,
        },
        currentAbortController.signal,
      );

      this.setResults(response.data.users_with_friends_status);
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
}
