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

export interface TrainingExercise {
  name: string;
  exercise_id: number;
  description: string;
  image: string;
  example_exercise: string;
  approaches: Approach[];
}

export interface TrainingEntry {
  Training_ex: TrainingExercise;
  date: string; // ISO string with timezone
}
