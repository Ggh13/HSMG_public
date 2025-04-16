import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AuthService, { LoginDTO, RegisterDTO, UpdateDTO } from "../../api/AuthService";
import { IUser } from "./types";
import { IErrorStore } from "@/modules/Errors/store/error-store/types";

export default class auth_store {
    user: IUser = {
        user_id: null,
        email: '',
        name: '',
        surname: '',
        nickname: '',
        avatar: ''
    };
    isAuth = false;
    private errorStore: IErrorStore;

    constructor(errorStore: IErrorStore) {
        this.errorStore = errorStore;

        makeAutoObservable(this);
        makePersistable(this, {
            name: "authStore",
            properties: ["user", 'isAuth'],
            storage: window.localStorage,
        });
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(LoginData: LoginDTO) {
        try {
            const response = await AuthService.login(LoginData);
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            await this.userdata();
        } catch (e: any) {
            this.errorStore.setError(e.response?.data?.message);
        }
    }

    async registration(RegisterData: RegisterDTO) {
        try {
            const response = await AuthService.registration(RegisterData);
            console.log(response);
            this.setAuth(true);
            this.errorStore.clearError();
        } catch (e: any) {
            this.errorStore.setError(e.response?.data?.message);
        }
    }


    async logout() {
        try {
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({
                user_id: null,
                email: '',
                name: '',
                surname: '',
                nickname: '',
                avatar: ''
            });
            this.errorStore.clearError();
        } catch (e: any) {
            this.errorStore.setError(e.response?.data?.message);
        }
    }

    async userdata() {
        try {
            const response = await AuthService.userdata();
            console.log(response.data);
            this.setUser(response.data);
            this.errorStore.clearError();
        } catch (e: any) {
            this.errorStore.setError(e.response?.data?.message);
        }
    }


    async UpdateUserData(UpdateData: UpdateDTO) {
        try {
            const response = await AuthService.updateUserData(UpdateData);
            console.log(response);
            this.setUser(UpdateData);
            console.log(this.user);
            this.errorStore.clearError();
        } catch (e: any) {
            this.errorStore.setError(e.response?.data?.message);
        }
    }
} 
