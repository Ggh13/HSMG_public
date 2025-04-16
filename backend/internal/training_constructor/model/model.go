package trainingmodel

import (
	usermodel "HSMGv2/internal/user/model"
)

type Training struct {
	ID          int     `json:"training_id" bson:"training_id"`
	Version     int     `json:"version" bson:"version"`
	Name        string  `json:"name" bson:"name"`
	Description string  `json:"description" bson:"description"`
	Image       string  `json:"image" bson:"image"`
	Price       float32 `json:"price" bson:"price"`
	Flag        int     `json:"flag" bson:"flag"`
	Type        string  `json:"type" bson:"type"`

	Author       usermodel.User `json:"author" bson:"author"`
	TrainingDays []TrainingDay  `json:"training_days" bson:"training_days"`

	//StatisticsTraining json.RawMessage `json:"statistics_training" bson:"statistics_training"`
	//InProgress         json.RawMessage `json:"in_progress" bson:"in_progress"`
}

type TrainingDay struct {
	Name        string     `json:"name" bson:"name"`
	Description string     `json:"description" bson:"description"`
	Image       string     `json:"image" bson:"image"`
	WeekDay     string     `json:"week_day" bson:"week_day"`
	Exercises   []Exercise `json:"exercises" bson:"exercises"`
}

type Exercise struct {
	Name            string     `json:"name" bson:"name"`
	ExerciseID      int        `json:"exercise_id" bson:"exercise_id"`
	Description     string     `json:"description" bson:"description"`
	Image           string     `json:"image" bson:"image"`
	ExampleExercise string     `json:"example_exercise" bson:"example_exercise"`
	Approaches      []Approach `json:"approaches" bson:"approaches"`
}

type Approach struct {
	RecommendedWeight float32    `json:"recommended_weight" bson:"recommended_weight"`
	RecommendedCount  int        `json:"recommended_count" bson:"recommended_count"`
	InProgressEx      ProgressEx `json:"in_progress_ex" bson:"in_progress_ex"`
}

type ProgressEx struct {
	Flag         bool    `json:"flag" bson:"flag"`
	DoneWeight   float32 `json:"done_weight" bson:"done_weight"`
	DoneCount    int     `json:"done_count" bson:"done_count"`
	DiffDoneRecW float32 `json:"diff_done_rec_w" bson:"diff_done_rec_w"`
	DiffDoneRecC int     `json:"diff_done_rec_c" bson:"diff_done_rec_c"`
}
