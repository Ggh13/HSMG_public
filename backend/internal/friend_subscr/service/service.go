package fried_subscr_service

import (
	fried_subscr_model "HSMGv2/internal/friend_subscr/model"
	"context"
	"fmt"
)

type Repository interface {
	Put(ctx context.Context, userID int, friendID int) error
	Delete(ctx context.Context, userID int, friendID int) error
	Get(ctx context.Context, userID int) (fried_subscr_model.Users, error)
}

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) AddFriend(ctx context.Context, userID int, friendID int) error {
	err := s.repo.Put(ctx, userID, friendID)
	if err != nil {
		return fmt.Errorf("fried_subscr_service.AddFriend: %w", err)
	}

	return nil
}

func (s *Service) DeleteFriend(ctx context.Context, userID int, friendID int) error {
	err := s.repo.Delete(ctx, userID, friendID)
	if err != nil {
		return fmt.Errorf("fried_subscr_service.DeleteFriend: %w", err)
	}

	return nil
}

func (s *Service) GetFriends(ctx context.Context, userID int) (fried_subscr_model.Users, error) {
	users, err := s.repo.Get(ctx, userID)
	if err != nil {
		return fried_subscr_model.Users{}, fmt.Errorf("fried_subscr_service.AddFriend: %w", err)
	}

	return users, nil
}
