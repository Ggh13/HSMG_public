package libraiesservice

import (
	librariesmodel "HSMGv2/internal/libraries/model"
	"context"
	"fmt"
	//"fmt"
)

type Repository interface {
	GetOne(ctx context.Context, trainingID int) (bool, librariesmodel.Exercise, error)
	GetAll(ctx context.Context) (bool, librariesmodel.Exercises, error)
}
type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetOne(ctx context.Context, training_exercise_id int) (bool, librariesmodel.Exercise, error) {
	var trainingProg librariesmodel.Exercise

	flag, trainingProg, err := s.repo.GetOne(ctx, training_exercise_id)
	if err != nil {
		return flag, trainingProg, fmt.Errorf("libraries.GetOne.%w", err)
	}

	return flag, trainingProg, err
}

func (s *Service) GetAll(ctx context.Context) (bool, librariesmodel.Exercises, error) {
	var trainingProg librariesmodel.Exercises

	flag, trainingProg, err := s.repo.GetAll(ctx)
	if err != nil {
		return flag, trainingProg, fmt.Errorf("libraries.GetAll.%w", err)
	}

	return flag, trainingProg, err
}
