package userservice

import (
	usermodel "HSMGv2/internal/user/model"
	"context"
	"fmt"
)

type Repository interface {
	Get(ctx context.Context, user_id int) (usermodel.User, error)
	GetSocialMedia(ctx context.Context, user_id int) (usermodel.SocialMedia, error)
	UpdateUserSQL(ctx context.Context, user usermodel.User) error
	UpdateSocialMediaSQL(ctx context.Context, user_id int, user usermodel.SocialMedia) error
	UpdateUserMongo(ctx context.Context, user_id int) (usermodel.User, error)
}

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetUser(ctx context.Context, user_id int) (usermodel.User, error) {
	user, err := s.repo.Get(ctx, user_id)
	if err != nil {
		return usermodel.User{}, fmt.Errorf("userservice.GetUser: %w", err)
	}
	return user, nil
}

func (s *Service) UpdateUser(ctx context.Context, user usermodel.User) error {
	err := s.repo.UpdateUserSQL(ctx, user)
	if err != nil {
		return fmt.Errorf("userservice.UpdateUser: %w", err)
	}
	return nil
}

func (s *Service) UpdateSocialMedia(ctx context.Context, user_id int, socialMedia usermodel.SocialMedia) error {
	err := s.repo.UpdateSocialMediaSQL(ctx, user_id, socialMedia)
	if err != nil {
		return fmt.Errorf("userservice.UpdateSocialMedia: %w", err)
	}
	return nil
}
