package trainingstatisticservice

import (
	trainingstatisticmodel "HSMGv2/internal/training_statistic/model"
	"context"
	"fmt"
)

type Repository interface {
	Get(ctx context.Context, training_id int) (trainingstatisticmodel.StatisticTraining, error)
	UpdateView(ctx context.Context, training_id int, views int) error
	UpdateFavourite(ctx context.Context, training_id int, fav int) error
	UpdateInTraining(ctx context.Context, training_id int, inTr int) error
	UpdateRewiews(ctx context.Context, training_id int, rew int) error
	CreateStatistic(ctx context.Context, training_id int) error
}

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetStat(ctx context.Context, training_id int) (trainingstatisticmodel.StatisticTraining, error) {
	stat, err := s.repo.Get(ctx, training_id)
	if err != nil {
		return trainingstatisticmodel.StatisticTraining{}, fmt.Errorf("trainingstatisticservice.%w", err)
	}

	return stat, nil
}
