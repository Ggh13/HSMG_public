import api from '@/api/http';
import { AxiosResponse } from 'axios';
import { UsersFilter, Users } from '../types/types';
import Api from '@/api/basehttp';

export default class SearchingUsersService {
  static async FindUsersForUnauthorized(
    filter: UsersFilter,
    signal?: AbortSignal,
  ): Promise<AxiosResponse<Users>> {
    return Api.post('/find_people', filter, { signal });
  }

  static async FindUsers(filter: UsersFilter, signal?: AbortSignal): Promise<AxiosResponse<Users>> {
    return api.post('/auth/find_people', filter, { signal });
  }
}
