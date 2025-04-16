package authservice

import (
	authmodel "HSMGv2/internal/auth/model"
	authutils "HSMGv2/internal/auth/utils"
	"context"
	"fmt"
)

type Repository interface {
	Put(ctx context.Context, user authmodel.UserRegister) (bool, error)
	Get(ctx context.Context, email string) (string, error)
	GetID(ctx context.Context, email string) (int, error)
}
type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Authorisation(ctx context.Context, user authmodel.UserAuth) (bool, string, error) {
	password, err := s.repo.Get(ctx, user.Email)
	if err != nil {
		return false, "", fmt.Errorf("authservice.authorisation: %w", err)
	}
	if password == "" {
		return false, "", fmt.Errorf("alredy exists: %w", err)
	}

	if err := authmodel.CheckPassword(&password, &user.Password); err != nil {
		return false, "", fmt.Errorf("authservice.authorisation: %w", err)
	}

	id, err := s.repo.GetID(ctx, user.Email)
	if err != nil {
		return false, "", fmt.Errorf("authservice.authorisation: %w", err)
	}

	token, err := authutils.GenerateJWT(id)
	if err != nil {
		return false, "", fmt.Errorf("authservice.authorisation: %w", err)
	}

	return true, token, nil
}

func (s *Service) Registration(ctx context.Context, user authmodel.UserRegister) (bool, error) {
	if err := authmodel.HashPassword(&user.Password); err != nil {
		return false, fmt.Errorf("authservice.registration: %w", err)
	}

	flag, err := s.repo.Put(ctx, user)
	if err != nil {
		return false, fmt.Errorf("authservice.registration: %w", err)
	}
	if flag {
		return false, nil
	}

	return true, nil
}
