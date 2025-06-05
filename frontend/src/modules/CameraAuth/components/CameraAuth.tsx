import { FC, useContext, useState } from "react";
import styles from './CameraAuth.module.css';
import CameraAuthService from "../api/CameraAuthService";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "@/app/provider";

interface CameraAuthProps {
    qr_id: string;
}
export const CameraAuth: FC<CameraAuthProps> = ({ qr_id }) => {
    const {authStore} = useContext(StoreContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            await CameraAuthService.AuthCamera(qr_id);
        } catch (e: any) {
            setError(e?.message);
        } finally {
            navigate(`/AccountPage/${authStore?.user?.user_id}`);
        }
    }
    return (
        <div className={styles["camera-auth__container"]}>
            <button className={styles["camera-auth__button"]} onClick={handleClick}>
                Авторизоваться
            </button>
            {error && <p className="m16">{error}</p>}
        </div>
    )
}