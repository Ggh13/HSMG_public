import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from './CameraAuthPage.module.css';
import { CameraAuth } from "@/modules/CameraAuth/components/CameraAuth";

export const CameraAuthPage: FC = () => {
    const { cam_hash } = useParams();
    return (
        <section className={styles["camera-page__container"]}>
            <CameraAuth qr_id={String(cam_hash)} />
        </section>
    )
}