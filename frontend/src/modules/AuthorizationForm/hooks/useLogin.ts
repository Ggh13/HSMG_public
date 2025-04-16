import { useContext } from 'react';
import { StoreContext } from '../../../app/provider';
import { useNavigate } from 'react-router-dom';
import { LoginDTO } from '../api/AuthService';
// import { profileStore } from '@/app/provider/StoreProvider';

export const useLogin = () => {
    const { authStore } = useContext(StoreContext);   
    const { profileStore } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleLogin = async (LoginData: LoginDTO) => {
        await authStore.login(LoginData);
        await profileStore.UserData();
        if (authStore.isAuth) {
            navigate(`/AccountPage/${authStore.user.user_id}`);
        }
    };

    return { handleLogin };
};