package searching_training_service

import (
	searching_training_model "HSMGv2/internal/training_searching/model"
	trainingstatisticrepository "HSMGv2/internal/training_statistic/repository"
	"HSMGv2/pkg/logger"
	"context"
	"fmt"

	"go.uber.org/zap"
)

type Repository interface {
	Get(ctx context.Context, trainingID int,
	) (searching_training_model.GeneralTrainingInfo, error)
	Find(ctx context.Context, filter searching_training_model.TrainingFilter,
	) (searching_training_model.TrainingPrograms, error)
}

type Service struct {
	repo          Repository
	statisticRepo trainingstatisticrepository.Repository
}

func New(r Repository, statRepo trainingstatisticrepository.Repository) *Service {
	return &Service{repo: r, statisticRepo: statRepo}
}

func (s *Service) Find(ctx context.Context, filter searching_training_model.TrainingFilter,
) (searching_training_model.TrainingPrograms, error) {
	trainingPrograms, err := s.repo.Find(ctx, filter)
	if err != nil {
		return searching_training_model.TrainingPrograms{}, fmt.Errorf("searching_training_service.Find: %w", err)
	}

	return trainingPrograms, nil
}

func (s *Service) Get(ctx context.Context, trainingID int,
) (searching_training_model.GeneralTrainingInfo, error) {
	trainingProgram, err := s.repo.Get(ctx, trainingID)
	if err != nil {
		return searching_training_model.GeneralTrainingInfo{}, fmt.Errorf("searching_training_service.Find: %w", err)
	}

	err = s.statisticRepo.UpdateView(ctx, trainingID, 1)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed add view to training", zap.Error(err))
	}

	return trainingProgram, nil
}
