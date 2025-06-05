export interface ExerciseFilter {
    user_id: number,
    id_exercise: number,
    typeData: "weight" | "count" 

}


export interface ExerciseStatistics {
    data: {
        [date: string]: number;
    };
}