export interface ProgramFilter {
  search_bar: string;
  rating: number;
  favourite_cnt: number;
  id_training_type: number;
  price_min: number;
  price_max: number;
  views_min: number;
  in_training_cnt: number;
}

export interface GeneralProgramInformation {
  training_id: number;
  version: number;
  type: "BodyBuilding" | string;
  name: string;
  description: string;
  image: string;
  price: number;

  statistics_training: {
    views: number;
    favourite: number;
    in_training: number;
    rating: number;
    reviews_count: number;
    reviews: string[];
  };

  author: {
    user_id: number;
    email: string;
    name: string;
    surname: string;
    nickname: string;
    avatar: string;
    social_media: {
      telegram_url: string;
      vk_url: string;
    };
  };
}

export interface ProgramsResponse {
  training_programs: GeneralProgramInformation[];
}


export function createEmptyProgram(): GeneralProgramInformation {
  return {
    training_id: 0,
    version: 0,
    type: "BodyBuilding",
    name: "",
    description: "",
    image: "",
    price: 0,
    statistics_training: {
      views: 0,
      favourite: 0,
      in_training: 0,
      rating: 0,
      reviews_count: 0,
      reviews: [],
    },
    author: {
      user_id: 0,
      email: "",
      name: "",
      surname: "",
      nickname: "",
      avatar: "",
      social_media: {
        telegram_url: "",
        vk_url: "",
      },
    },
  };
}
