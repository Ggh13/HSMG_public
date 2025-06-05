import { IUser } from "@/modules/Profile/types/types";
import { GeneralProgramInformation } from "@/modules/Searching/ProgramsSearch/types/types";

export interface SocialMedia {
  telegram_url: string;
  vk_url: string;
}


export interface Approach {
  recommended_weight: number;
  recommended_count: number;
  in_progress_ex: {
    flag: boolean;
    done_weight: number;
    done_count: number;
    diff_done_rec_w: number;
    diff_done_rec_c: number;
  };
}

export interface Exercise {
  name: string;
  exercise_id: number;
  description: string;
  image: string;
  example_exercise: string;
  approaches: Approach[];
}

export interface TrainingDay {
  name: string;
  description: string;
  image: string;
  week_day: string;
  exercises: Exercise[];
}

export interface TrainingProgram {
  training_id: number;
  version: number;
  name: string;
  description: string;
  image: string;
  price: number;
  flag: number;
  type: string;
  author: IUser;
  training_days: TrainingDay[];
}

export interface TrainingProgramsResponse {
  training_programs: GeneralProgramInformation[];
}

export interface ExerciseFromLib {
  id: number;
  name: string;
  link_video: string;
}