import { useContext, useState } from 'react';
import { StoreContext } from '../../../app/provider';
import { RegisterFormData, RegisterFormActions } from '../types/auth';
import { s3Store } from '@/app/provider/StoreProvider';
export const useRegister = (): RegisterFormData & RegisterFormActions & { isRegistered: boolean } => {
    const [formData, setFormData] = useState<Omit<RegisterFormData, 'fileName' | 'avatarUrl'>>({
        name: '',
        surname: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [fileName, setFileName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const { authStore, errorstore } = useContext(StoreContext);
    
    const setName = (value: string) => setFormData(prev => ({ ...prev, name: value }));
    const setSurname = (value: string) => setFormData(prev => ({ ...prev, surname: value }));
    const setNickname = (value: string) => setFormData(prev => ({ ...prev, nickname: value }));
    const setEmail = (value: string) => setFormData(prev => ({ ...prev, email: value }));
    const setPassword = (value: string) => setFormData(prev => ({ ...prev, password: value }));
    const setConfirmPassword = (value: string) => setFormData(prev => ({ ...prev, confirmPassword: value }));

    const imageUploaded = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            s3Store.setFile(file);
            await s3Store.uploadFile();
            if (s3Store.fileUrl) {
                setAvatarUrl(s3Store.fileUrl);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        console.log("Отправка формы", {
            name: formData.name,
            surname: formData.surname,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            avatar: avatarUrl
        });

        await authStore.registration({
            name: formData.name,
            surname: formData.surname,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            avatar: avatarUrl
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
        avatarUrl,
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
