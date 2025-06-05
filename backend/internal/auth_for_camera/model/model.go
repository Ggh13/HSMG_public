package afc_model

type UpdateMessage struct {
	Event     string `json:"event"`
	ID        int    `json:"id"`
	OldUserID int    `json:"old_user_id"`
	NewUserID int    `json:"new_user_id"`
	QRCode    string `json:"qr_code"`
}
