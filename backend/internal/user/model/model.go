package usermodel

type SocialMedia struct {
	TelegramURL *string `json:"telegram_url" bson:"telegram_url,omitempty"`
	VkURL       *string `json:"vk_url"       bson:"vk_url,omitempty"`
	YouTubeURL  *string `json:"youtube_url"  bson:"youtube_url,omitempty"`
}

type User struct {
	ID          int         `json:"user_id"   bson:"user_id"`
	Email       string      `json:"email"     bson:"email"`
	Name        string      `json:"name"      bson:"name"`
	Surname     string      `json:"surname"   bson:"surname"`
	NickName    string      `json:"nickname"  bson:"nickname"`
	Avatar      *string     `json:"avatar"    bson:"avatar,omitempty"`
	SocialMedia SocialMedia `json:"social_media" bson:"social_media"`
}
