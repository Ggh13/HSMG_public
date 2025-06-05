export interface DoneExercise {
  name: string;
  exercise_id: number;
  image: string;
  process_video: string;
  flag: boolean;
  approach: {
    recommended_weight: number;
    recommended_count: number;
    in_progress_ex: {
      flag: boolean;
      done_weight: number;
      done_count: number;
      diff_done_rec_w: number;
      diff_done_rec_c: number;
    };
  };
}


export interface Programs {
  training_programs: Program[];
}

export interface Program {
  training_id: number;
  version: number;
  name: string;
  description: string;
  image: string;
  price: number;
  flag: number;
  type: string;
  author: Author;
  training_days: Day[];
}

export interface Author {
  user_id: number;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  avatar: string;
  social_media: SocialMedia;
}

export interface SocialMedia {
  telegram_url: string;
  vk_url: string;
}

export interface Day {
  name: string;
  description: string;
  image: string;
  week_day: string;
  exercises: Exercise[];
  flag: boolean;
}

export interface Exercise {
  name: string;
  exercise_id: number;
  description: string;
  image: string;
  example_exercise: string;
  flag: boolean;
  approaches: Approach[];
}

export interface Approach {
  recommended_weight: number;
  recommended_count: number;
  in_progress_ex: InProgressExercise;
}

export interface InProgressExercise {
  flag: boolean;
  done_weight: number;
  done_count: number;
  diff_done_rec_w: number;
  diff_done_rec_c: number;
}

export function createEmptyProgram(): Program {
  return {
    training_id: 0,
    version: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    flag: 0,
    type: '',
    author: {
      user_id: 0,
      email: '',
      name: '',
      surname: '',
      nickname: '',
      avatar: '',
      social_media: {
        telegram_url: '',
        vk_url: '',
      },
    },
    training_days: [],
  };
}

export function createEmptyDay(): Day {
  return {
    name: '',
    description: '',
    image: '',
    week_day: '',
    exercises: [],
    flag: false
  };
}

export function createEmptyExercise(): Exercise {
  return {
    name: '',
    exercise_id: 0,
    description: '',
    image: '',
    example_exercise: '',
    approaches: [],
    flag: false
  };
}

export interface TrainingMenuItem {
  img: string;
  title: string;
  describtion: string;
  page: string;
}


export interface InProgressExercise {
  flag: boolean;
  done_weight: number;
  done_count: number;
  diff_done_rec_w: number;
  diff_done_rec_c: number;
}

export interface Approach {
  recommended_weight: number;
  recommended_count: number;
  in_progress_ex: InProgressExercise;
}

export interface ExerciseInHistory {
  name: string;
  exercise_id: number;
  image: string;
  process_video: string;
  approach: Approach;
}
