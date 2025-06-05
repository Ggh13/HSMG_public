import { makeAutoObservable } from "mobx";
import { IErrorStore } from "./types";


export default class error_store implements IErrorStore {
    error: string | null = ""

    constructor() {
        makeAutoObservable(this);
    }

    setError(error: string) {
        this.error = error;
    }

    clearError() {
        this.error = "";
    }

    get hasError() {
        return this.error !== "";
    }
}


