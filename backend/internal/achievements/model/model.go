package achievements_model

import "time"

type Achievement struct {
	AchievementID int       `json:"id"`
	ExerciseID    int       `json:"exercise_id"`
	NameExercise  string    `json:"name_exercise"`
	Image         string    `json:"image"`
	Weight        float32   `json:"weight"`
	Count         int       `json:"count"`
	Date          time.Time `json:"date"`
	VideoRecord   string    `json:"record_video"`
}

type Achievements struct {
	Achievements []Achievement `json:"achievements"`
}

type BestApproach struct {
	ExerciseID   int       `json:"exercise_id"`
	NameExercise *string   `json:"name_exercise"`
	Date         time.Time `json:"date"`
	DoneWeigth   float32   `json:"done_weight"`
	DoneCount    int       `json:"done_count"`
	Image        *string   `json:"image"`
	VideoRecord  *string   `json:"video_record"`
}

type BestApproaches struct {
	Approaches []BestApproach `json:"best_exercises"`
}
