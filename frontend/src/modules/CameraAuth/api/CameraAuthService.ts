import api from "@/api/http";
import { AxiosResponse } from "axios";

export default class CameraAuthService {
    static async AuthCamera(qr_id: string): Promise<AxiosResponse> {
        return api.post(`/auth_user_to_camera/new_qr/${qr_id}`);
    }
}