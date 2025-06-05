package historymodel

import (
	training_constructormodel "HSMGv2/internal/training_constructor/model"
)

type ExerciseWithDate struct {
	Training_ex training_constructormodel.Exercise
	Date        string `json:"date" bson:"date"`
}
