import api from '../../../api/http';
import { AxiosResponse } from 'axios';

export interface LoginDTO{
    email: string,
    password: string
}

export interface RegisterDTO{
    name: string,
    surname: string,
    nickname: string,
    email: string,
    password: string,
    avatar?: string
}

export interface UpdateDTO{
    user_id: number | null,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    avatar: string
}

interface AuthResponse{
    message: string,
    token: string
}

interface UserDataResponse{
    user_id: number,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    avatar: string,
    social_media: {
      telegram_url?: string,
      vk_url?: string
    }
}

export default class AuthService {
    static async login(LoginData: LoginDTO): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/login', LoginData);
    }

    static async registration(RegisterData: RegisterDTO): Promise<AxiosResponse> {
        return api.post('/register', RegisterData);
    }

    static async logout() {
        return api.post('/logout');
    }

    static async userdata(): Promise<AxiosResponse<UserDataResponse>> {
        return api.get<UserDataResponse>('/get_authorized_user_data');
    }

    static async updateUserData(UpdateData: UpdateDTO) {
        return api.post('/update_user_data', UpdateData);
    } 

}