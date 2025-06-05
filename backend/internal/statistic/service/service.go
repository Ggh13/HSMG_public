package statisticservice

import (
	statisticmodel "HSMGv2/internal/statistic/model"
	"context"
	"fmt"

	"github.com/jackc/pgx"
)

type Repository interface {
	GetTraining(ctx context.Context, staticRequest statisticmodel.StatisticExersiceRequest) (statisticmodel.StatisticByExersice, error)
}

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetStatisticByTrainingExercises(ctx context.Context, staticRequest statisticmodel.StatisticExersiceRequest) (statisticmodel.StatisticByExersice, error) {
	static, err := s.repo.GetTraining(ctx, staticRequest)
	if err == pgx.ErrNoRows {
		return static, err
	} else if err != nil {
		return static, fmt.Errorf("statisticservice.GetStatisticByTrainingExercises: %w", err)
	}

	return static, nil
}
