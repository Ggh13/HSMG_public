export interface RegisterFormData {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    fileName: string;
    confirmPassword: string;
    base64String: string;
}

export interface RegisterFormActions {
    setName: (value: string) => void;
    setSurname: (value: string) => void;
    setNickname: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    imageUploaded: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}