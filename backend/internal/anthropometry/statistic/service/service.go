package anthropometry_stat_service

import (
	anthropometry_stat_model "HSMGv2/internal/anthropometry/statistic/model"
	"context"
	"fmt"
)

type Repository interface {
	Get(ctx context.Context, userID int, filter anthropometry_stat_model.Filter,
	) (anthropometry_stat_model.AnthropometryStat, error)
}
type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetStat(ctx context.Context, userID int, filter anthropometry_stat_model.Filter,
) (anthropometry_stat_model.AnthropometryStat, error) {
	stat, err := s.repo.Get(ctx, userID, filter)
	if err != nil {
		return anthropometry_stat_model.AnthropometryStat{}, fmt.Errorf("anthropometry_stat_service.GetStat: %w", err)
	}

	return stat, nil
}
