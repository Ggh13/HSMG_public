package achievements_service

import (
	achievements_model "HSMGv2/internal/achievements/model"
	serLib "HSMGv2/internal/libraries/service"
	"context"
	"fmt"
)

type Repository interface {
	Get(ctx context.Context, userID int, isAuth bool,
	) (achievements_model.Achievements, error)
	GetBestAproaches(ctx context.Context, userID int) (achievements_model.BestApproaches, error)
	Create(ctx context.Context, userID int, apr achievements_model.Achievement) error
	Delete(ctx context.Context, achievementID int) error
}

type Service struct {
	repo     Repository
	servLibs serLib.Service
}

func New(r Repository, sL serLib.Service) Service {
	return Service{repo: r, servLibs: sL}
}

func (s *Service) GetBestAproaches(ctx context.Context, userID int, isAuth bool,
) (achievements_model.BestApproaches, error) {
	apr, err := s.repo.GetBestAproaches(ctx, userID)
	if err != nil {
		return achievements_model.BestApproaches{}, fmt.Errorf("achievements_service.GetBestAproaches: %w", err)
	}
	for i := 0; i < len(apr.Approaches); i++ {
		_, ex, _ := s.servLibs.GetOne(ctx, apr.Approaches[i].ExerciseID)
		apr.Approaches[i].NameExercise = &ex.Name
	}
	return apr, nil
}

func (s *Service) Get(ctx context.Context, userID int, isAuth bool,
) (achievements_model.Achievements, error) {
	apr, err := s.repo.Get(ctx, userID, isAuth)
	if err != nil {
		return achievements_model.Achievements{}, fmt.Errorf("achievements_service.Get: %w", err)
	}
	for i := 0; i < len(apr.Achievements); i++ {
		_, ex, _ := s.servLibs.GetOne(ctx, apr.Achievements[i].ExerciseID)
		apr.Achievements[i].NameExercise = ex.Name
	}

	return apr, nil
}

func (s *Service) Create(ctx context.Context, userID int, apr achievements_model.Achievement,
) error {
	err := s.repo.Create(ctx, userID, apr)
	if err != nil {
		return fmt.Errorf("achievements_service.Create: %w", err)
	}

	return nil
}

func (s *Service) Delete(ctx context.Context, userID int, achievementID int) error {
	err := s.repo.Delete(ctx, achievementID)
	if err != nil {
		return fmt.Errorf("achievements_service.Delete: %w", err)
	}

	return nil
}
