export interface UsersFilter {
  search_bar: string;
}

export interface User {
  user_id: number | null;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  avatar: string;
  social_media: {
    telegram_url: string;
    vk_url: string;
    youtube_url: string;
  };
}

export interface UserInformation {
  user: User,
  is_friend: boolean,
}

export interface Users {
  users: UserInformation;
}
