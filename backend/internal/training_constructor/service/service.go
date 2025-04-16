package trainingservice

import (
	training_constructormodel "HSMGv2/internal/training_constructor/model"
	"context"
	"fmt"
)

type Repository interface {
	GetMongo(ctx context.Context, id int) (training_constructormodel.Training, error)
	AddMongo(ctx context.Context, trainng_program training_constructormodel.Training) (bool, error)
	UpdateMongo(ctx context.Context, trainng_program training_constructormodel.Training) (bool, error)

	GetPsg(ctx context.Context, id int) (training_constructormodel.Training, error)
	AddPsg(ctx context.Context, trainng_program training_constructormodel.Training) (int, bool, error)
	UpdatePsg(ctx context.Context, trainng_program training_constructormodel.Training) (bool, error)
}
type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetFull(ctx context.Context, id_training_program int) (training_constructormodel.Training, error) {
	training_program, err := s.repo.GetMongo(ctx, id_training_program)
	if err != nil {
		return training_program, fmt.Errorf("trainingservice.GetFull.%w", err)
	}
	return training_program, nil
}

func (s *Service) GetGeneral(ctx context.Context, id_training_program int) (training_constructormodel.Training, error) {
	training_program, err := s.repo.GetPsg(ctx, id_training_program)
	if err != nil {
		return training_program, fmt.Errorf("trainingservice.GetGeneral.%w", err)
	}
	return training_program, nil
}

func (s *Service) Add(ctx context.Context, training_program training_constructormodel.Training) (bool, error) {

	id_saved, flag, err := s.repo.AddPsg(ctx, training_program)

	if err != nil {
		return flag, fmt.Errorf("trainingservice.Add.%w", err)
	}

	if !flag {
		return flag, nil
	}

	training_program.ID = id_saved

	flag, err = s.repo.AddMongo(ctx, training_program)

	if err != nil {
		return flag, fmt.Errorf("trainingservice.Add.%w", err)
	}

	if !flag {
		return flag, nil
	}

	// Возвращать id из постгреса и добавление в постгрес делать первым

	return true, nil
}
func (s *Service) Update(ctx context.Context, training_program training_constructormodel.Training) (bool, error) {

	flag, err := s.repo.UpdatePsg(ctx, training_program)
	if !flag {
		return flag, nil
	}
	if err != nil {
		return flag, fmt.Errorf("trainingservice.Update.%w", err)
	}

	flag, err = s.repo.UpdateMongo(ctx, training_program)
	if !flag {
		return flag, nil
	}
	if err != nil {
		return flag, fmt.Errorf("trainingservice.Update.%w", err)
	}

	return true, nil
}
