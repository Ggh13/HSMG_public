package users_searching_service

import (
	users_searching_models "HSMGv2/internal/users_searching/models"
	"context"
	"fmt"
)

type Repository interface {
	Get(ctx context.Context, userID int, filter users_searching_models.UserFilter) (users_searching_models.Users, error)
}

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Get(ctx context.Context, userID int, filter users_searching_models.UserFilter) (users_searching_models.Users, error) {
	users, err := s.repo.Get(ctx, userID, filter)
	if err != nil {
		return users_searching_models.Users{}, fmt.Errorf("users_searching_service: %w", err)
	}

	return users, nil
}
