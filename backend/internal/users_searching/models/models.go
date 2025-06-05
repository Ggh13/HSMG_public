package users_searching_models

import usermodel "HSMGv2/internal/user/model"

type UserWithFriendStatus struct {
	User     usermodel.User `json:"user"`
	IsFriend bool           `json:"is_friend"`
}

type Users struct {
	UserWithFriendStatus []UserWithFriendStatus `json:"users_with_friends_status"`
}

type UserFilter struct {
	SearchBar *string `json:"search_bar,omitempty"`
}
