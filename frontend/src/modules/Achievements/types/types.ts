export interface Achievement {
  id: number,
  exercise_id: number,
  name_exercise: string,
  image: string,
  weight: number,
  count: number,
  date?: Date | null,
  record_video: string
}

export interface BestExercise {
  exercise_id: number,
  name_exercise: string,
  date?: Date | null,
  done_weight: number,
  done_count: number,
  image: string,
  viceo_record: number
}