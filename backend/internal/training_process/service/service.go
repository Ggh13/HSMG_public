package training_processservice

import (
	trainingrepository "HSMGv2/internal/training_constructor/repository"
	progress_exmodel "HSMGv2/internal/training_process/model"
	"context"
	"fmt"
	//"fmt"
)

type Repository interface {
	Get(ctx context.Context, trainingID int, userID int) (bool, progress_exmodel.UsersTrainingProgram, error)
	AddPsg(ctx context.Context, trainingID int, userID int) (bool, error)
	DoneEx(ctx context.Context, userID int, exerciseID int, exercise_data progress_exmodel.UsersExercise) (bool, error)
	UpdatePsg(ctx context.Context, trainng_program progress_exmodel.UsersTrainingProgram) (bool, error)
	AddMongo(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram) (bool, error)
	UpdateMongo(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram) (bool, error)
	GetTrainings(ctx context.Context, userID int) (progress_exmodel.UserTrainings, error)
}
type Service struct {
	repo            Repository
	ConstructorRepo trainingrepository.Repository
}

func NewService(ctx context.Context, repo Repository, ConstructorRepo trainingrepository.Repository) *Service {
	return &Service{repo: repo, ConstructorRepo: ConstructorRepo}
}

func (s *Service) Get(ctx context.Context, trainingID int, userID int,
) (bool, progress_exmodel.UsersTrainingProgram, error) {
	var trainingProg progress_exmodel.UsersTrainingProgram

	flag, trainingProg, err := s.repo.Get(ctx, trainingID, userID)
	if err != nil {
		return flag, trainingProg, fmt.Errorf("training_process_service.Get.%w", err)
	}

	return flag, trainingProg, err
}

func (s *Service) Update(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram, userID int) (bool, error) {
	usersTraining.UserID = userID

	flag, err := s.repo.UpdateMongo(ctx, usersTraining)
	if err != nil {
		return flag, fmt.Errorf("training_process_service.Update.%w", err)
	}


	//flag, err = s.repo.UpdatePsg(ctx, usersTraining)
	//if err != nil {
	//	return flag, fmt.Errorf("training_process_service.Update.%w", err)
	//}

	return flag, err
}

func (s *Service) Add(ctx context.Context, trainingID int, userID int) (bool, error) {
	var trainProg progress_exmodel.UsersTrainingProgram
	var err error

	trainProg.Training, err = s.ConstructorRepo.GetMongo(ctx, trainingID)
	if err != nil {
		return false, fmt.Errorf("training_process_service.Add.%w", err)
	}

	flag, err := s.repo.AddPsg(ctx, trainProg.Training.ID, userID)
	if err != nil {
		return flag, fmt.Errorf("training_process_service.Add.%w", err)
	}
	if !flag {
		return flag, nil
	}

	trainProg.UserID = userID
	flag, err = s.repo.AddMongo(ctx, trainProg)
	if err != nil {
		return flag, fmt.Errorf("training_process_service.Add.%w", err)
	}
	if !flag {
		return flag, nil
	}

	return true, nil
}

func (s *Service) DoneEx(ctx context.Context, userID int, exerciseID int,
	exerciseData progress_exmodel.UsersExercise) (bool, error) {

	fmt.Println(exerciseData)
	flag, err := s.repo.DoneEx(ctx, userID, exerciseID, exerciseData)
	if err != nil {
		return flag, fmt.Errorf("training_process_service.DoneEx.%w", err)
	}
	return flag, err
}

func (s *Service) GetUsersPrograms(ctx context.Context, userID int) (progress_exmodel.UserTrainings, error) {
	trainings, err := s.repo.GetTrainings(ctx, userID)
	if err != nil {
		return progress_exmodel.UserTrainings{}, fmt.Errorf("progress_processservice.GetUsersPrograms^ %w", err)
	}

	return trainings, nil
}
