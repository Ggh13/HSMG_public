import { FC } from "react"
import { TrainingEntry } from "../../types"
import styles from "./ExerciseInHistoryList.module.css"
import { ExerciseInHistory } from "../ExerciseInHistory/ExerciseInHistory"

interface ExerciseInHistoryListProps {
  exercises: TrainingEntry[]
}



export const ExerciseInHistoryList:FC<ExerciseInHistoryListProps> = ({exercises}) => {
  return (
    <section>
      <ul className={styles['exercises__list']}>
      {exercises.map((exercise) => (
        <li key={exercise.Training_ex.exercise_id}>
          <ExerciseInHistory exercise={exercise}/>
        </li>
      ))}
    </ul>
    </section>
  )
}