import { useContext, useState } from 'react';
import { StoreContext } from '../../../app/provider';
import { RegisterFormData, RegisterFormActions } from '../types/auth';

export const useRegister = (): RegisterFormData & RegisterFormActions & { isRegistered: boolean } => {
    const [formData, setFormData] = useState<Omit<RegisterFormData, 'fileName' | 'base64String'>>({
        name: '',
        surname: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const [fileName, setFileName] = useState('');
    const [base64String, setBase64String] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    
    const {authStore, errorstore} = useContext(StoreContext);

    const setName = (value: string) => setFormData(prev => ({ ...prev, name: value }));
    const setSurname = (value: string) => setFormData(prev => ({ ...prev, surname: value }));
    const setNickname = (value: string) => setFormData(prev => ({ ...prev, nickname: value }));
    const setEmail = (value: string) => setFormData(prev => ({ ...prev, email: value }));
    const setPassword = (value: string) => setFormData(prev => ({ ...prev, password: value }));
    const setConfirmPassword = (value: string) => setFormData(prev => ({ ...prev, confirmPassword: value }))


    const imageUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);

            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result?.toString().replace("data:", "").replace(/^.+,/, "") || '';
                setBase64String(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        await authStore.registration({
            name: formData.name,
            surname: formData.surname,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            avatar: base64String
    });
        
        if (!errorstore.hasError) {
            setIsRegistered(true);
        } else {
            alert(errorstore.error);
        }
    };

    return {
        ...formData,
        fileName,
        base64String,
        isRegistered,
        setName,
        setSurname,
        setNickname,
        setEmail,
        setPassword,
        setConfirmPassword,
        imageUploaded,
        handleSubmit
    };
};