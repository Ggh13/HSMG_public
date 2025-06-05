export interface IUser {
    user_id: number | null;
    email: string;
    name: string;
    surname: string;
    nickname: string;
    avatar: string;
    social_media?: {
      telegram_url: string,
      vk_url: string,
      youtube_url: string
    }
}

