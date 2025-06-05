package fried_subscr_model

import usermodel "HSMGv2/internal/user/model"

type Users struct {
	Users []usermodel.User `json:"users"`
}
