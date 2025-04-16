export interface IErrorStore {
    setError: (message: string) => void;
    clearError: () => void;
}