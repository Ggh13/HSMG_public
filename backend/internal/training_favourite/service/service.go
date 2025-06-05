package trainingfavouriteservice

import (
	trainingfavouritemodel "HSMGv2/internal/training_favourite/model"
	trainingstatisticrepository "HSMGv2/internal/training_statistic/repository"
	"HSMGv2/pkg/logger"
	"context"
	"fmt"

	"go.uber.org/zap"
)

type Repository interface {
	Add(ctx context.Context, training_id int, user_id int) error
	Remove(ctx context.Context, training_id int, user_id int) error
	Get(ctx context.Context, user_id int) (trainingfavouritemodel.FavouritesTrainings, error)
}

type Service struct {
	repo     Repository
	statRepo trainingstatisticrepository.Repository
}

func NewService(ctx context.Context, repo Repository, statRepo trainingstatisticrepository.Repository) *Service {
	return &Service{repo: repo, statRepo: statRepo}
}

func (s *Service) Get(ctx context.Context, user_id int) (trainingfavouritemodel.FavouritesTrainings, error) {
	trainings, err := s.repo.Get(ctx, user_id)
	if err != nil {
		return trainingfavouritemodel.FavouritesTrainings{}, fmt.Errorf("trainingfavouriteservice.Get: %w", err)
	}

	return trainings, nil
}

func (s *Service) Remove(ctx context.Context, training_id int, user_id int) error {
	err := s.statRepo.UpdateFavourite(ctx, training_id, -1)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed add view to training", zap.Error(err))
	}

	err = s.repo.Remove(ctx, training_id, user_id)
	if err != nil {
		return fmt.Errorf("trainingfavouriteservice.Remove%w", err)
	}

	return nil
}

func (s *Service) Add(ctx context.Context, training_id int, user_id int) error {
	err := s.statRepo.UpdateFavourite(ctx, training_id, 1)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed add view to training", zap.Error(err))
	}
	err = s.repo.Add(ctx, training_id, user_id)
	if err != nil {
		return fmt.Errorf("trainingfavouriteservice.Add.%w", err)
	}
	return nil
}
