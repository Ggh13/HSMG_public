package libraiesservice

import (
	history_model "HSMGv2/internal/history/model"
	"context"
	"fmt"
	//"fmt"
)

type Repository interface {
	GetExerciseHistory(ctx context.Context, trainingID int) (bool, []history_model.ExerciseWithDate, error)
}
type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetExerciseHistory(ctx context.Context, userID int) (bool, []history_model.ExerciseWithDate, error) {
	var trainingProg []history_model.ExerciseWithDate

	flag, trainingProg, err := s.repo.GetExerciseHistory(ctx, userID)
	if err != nil {
		return flag, trainingProg, fmt.Errorf("libraries.GetOne.%w", err)
	}

	return flag, trainingProg, err
}
