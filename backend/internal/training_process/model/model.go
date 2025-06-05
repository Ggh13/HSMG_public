package progress_exmodel

import (
	training_constructormodel "HSMGv2/internal/training_constructor/model"
)

type UsersExercise struct {
	Name         string                             `json:"name"`
	ExerciseID   int                                `json:"exercise_id"`
	Image        string                             `json:"image"`
	ProcessVideo string                             `json:"process_video"`
	Approach     training_constructormodel.Approach `json:"approach"`
}

type UsersTrainingProgram struct {
	UserID   int                                `json:"user_id" bson:"user_id"`
	Training training_constructormodel.Training `bson:",inline" json:",inline"`
}

type UserTrainings struct {
	Trainings training_constructormodel.UsersTrainings `json:"training_programs"`
}
