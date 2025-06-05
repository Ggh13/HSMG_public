package anthropometryservice

import (
	anthropometrymodel "HSMGv2/internal/anthropometry/general/model"
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type Repository interface {
	Put(ctx context.Context, anthr anthropometrymodel.Anthropometry, userID int) error
	Delete(ctx context.Context, userID int) error
	Get(ctx context.Context, userID int) (anthropometrymodel.Anthropometry, error)
	CheckExists(ctx context.Context, userID int) (bool, error)
}

var ErrAlreadyExists = errors.New("exists already")
var ErrATimeIsUp = errors.New("time is up")

type Service struct {
	repo Repository
}

func NewService(ctx context.Context, repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) SetAnthropometry(ctx context.Context, anthr anthropometrymodel.Anthropometry, userID int) error {
	flag, err := s.repo.CheckExists(ctx, userID)
	if err != nil {
		return fmt.Errorf("anthropometryservice.SetAnthropometry: %w", err)
	}
	if flag {
		return ErrAlreadyExists
	}

	err = s.repo.Put(ctx, anthr, userID)
	if err != nil {
		return fmt.Errorf("anthropometryservice.SetAnthropometry: %w", err)
	}

	return nil
}

func (s *Service) DeleteAnthropometry(ctx context.Context, userID int) error {
	flag, err := s.repo.CheckExists(ctx, userID)
	if err != nil {
		return fmt.Errorf("anthropometryservice.DeleteAnthropometry: %w", err)
	}
	if !flag {
		return ErrATimeIsUp
	}

	err = s.repo.Delete(ctx, userID)
	if err != nil {
		return fmt.Errorf("anthroppometryrepository.Delete$ %w", err)
	}

	return nil
}

func (s *Service) GetAnthropometry(ctx context.Context, userID int) (anthropometrymodel.Anthropometry, error) {
	anthr, err := s.repo.Get(ctx, userID)
	if err == pgx.ErrNoRows {
		return anthropometrymodel.Anthropometry{}, err
	}
	if err != nil {
		return anthropometrymodel.Anthropometry{}, fmt.Errorf("anthropometryservice.GetAnthropometry: %w", err)
	}

	return anthr, nil
}
