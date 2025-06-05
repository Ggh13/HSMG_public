package progress_processrepository

import (
	training_constructormodel "HSMGv2/internal/training_constructor/model"
	progress_exmodel "HSMGv2/internal/training_process/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

const (
	InsertQuery_done_ex = `INSERT INTO public.done_exercises (
							user_id,
							id_exercises,
							weight_done,
							count_done,
							recommended_weight,
							recommended_count)
	 						VALUES($1, $2, $3, $4, $5, $6)`
	InsertQuery = "INSERT INTO public.user_choosen_training_programs (id_user, id_program) VALUES($1, $2)"
	UpdateQuery = `UPDATE public.user_choosen_training_programs 
							SET name = $1, description = $2, type = $3, image = $4, author_id = $5,	version = $6 , flag = $7
							WHERE training_id = $8`
	usersTainingsQuery = `SELECT 
				tp.training_id,
				tp.name,
				tp.description,
				tp.image,
				tp.type,
				tp.version,
				tp.price,
				tp.flag,
				u.user_id,
				u.email,
				u.name,
				u.surname,
				u.nickname,
				u.image,
				sm.telegram_url,
				sm.vk_url,
				sm.youtube_url,
				st.views,
				st.favourite,
				st.in_training,
				st.rating,
				st.reviews_count
			FROM 
				user_choosen_training_programs utp 
			JOIN 
				public.training_programs tp ON tp.training_id = utp.id_program
			JOIN 
				users u ON tp.author_id = u.user_id
			LEFT JOIN 
				social_media sm ON u.user_id = sm.user_id
			JOIN 
				statistic_training st ON st.training_id = tp.training_id
			WHERE 
				utp.id_user = $1`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Get(ctx context.Context, trainingID int, userID int,
) (bool, progress_exmodel.UsersTrainingProgram, error) {
	var usersTrainingProgram progress_exmodel.UsersTrainingProgram

	collection := r.mongoDB.Collection("users_training_programs")
	err := collection.FindOne(context.TODO(), bson.M{"training_id": trainingID, "user_id": userID}).Decode(&usersTrainingProgram)
	if err != nil {
		return false, progress_exmodel.UsersTrainingProgram{}, fmt.Errorf("training_process_repository.GetMongo: %w", err)
	}

	return true, usersTrainingProgram, nil
}

func (r *Repository) AddPsg(ctx context.Context, trainingID int, userID int) (bool, error) {
	_, err := r.pgDB.Exec(
		context.Background(),
		InsertQuery,
		userID,
		trainingID,
	)

	if err != nil {
		return false, fmt.Errorf("training_process_repository.AddPsg: %w", err)
	}

	return true, nil
}

func (r *Repository) DoneEx(ctx context.Context, userID int, exerciseID int, exerciseData progress_exmodel.UsersExercise) (bool, error) {

	_, err := r.pgDB.Exec(
		context.Background(),
		InsertQuery_done_ex,
		userID,
		exerciseID,
		exerciseData.Approach.InProgressEx.DoneWeight,
		exerciseData.Approach.InProgressEx.DoneCount,
		exerciseData.Approach.RecommendedWeight,
		exerciseData.Approach.RecommendedCount,
	)

	if err != nil {
		return false, fmt.Errorf("training_process_repository.DoneEx: %w", err)
	}

	return true, nil
}

func (r *Repository) UpdatePsg(ctx context.Context, trainng_program progress_exmodel.UsersTrainingProgram) (bool, error) {
	trainng_program.Training.Version = trainng_program.Training.Version + 1
	_, err := r.pgDB.Exec(context.Background(), UpdateQuery,
		trainng_program.Training.Name,
		trainng_program.Training.Description,
		trainng_program.Training.Type,
		trainng_program.Training.Image,
		trainng_program.Training.Author.ID,
		trainng_program.Training.Version,
		trainng_program.Training.Flag,
		trainng_program.Training.ID,
	)

	if err != nil {
		return false, fmt.Errorf("training_process_repository.UpdatePsg: %w", err)
	}

	return true, nil

}

func (r *Repository) GetPsg(ctx context.Context, id int) (training_constructormodel.Training, error) {
	// Нужно дописать после мерджа со статистикой

	//var trainng_program training_constructormodel.Training

	return training_constructormodel.Training{}, nil

}

func (r *Repository) AddMongo(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram) (bool, error) {
	collection := r.mongoDB.Collection("users_training_programs")
	_, err := collection.InsertOne(context.TODO(), usersTraining)
	if err != nil {
		return false, fmt.Errorf("training_process_repository.AddMongo: %w", err)
	}

	return true, nil
}

func (r *Repository) UpdateMongo(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram) (bool, error) {
	collection := r.mongoDB.Collection("users_training_programs")
	update := bson.M{
		"$set": usersTraining,
	}

	filter := bson.M{"training_id": usersTraining.Training.ID, "user_id": usersTraining.UserID}

	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return false, fmt.Errorf("training_process_repository.UpdateMongo: %w", err)
	}

	return true, nil
}

func (r *Repository) GetTrainings(ctx context.Context, userID int) (progress_exmodel.UserTrainings, error) {
	query := usersTainingsQuery
	rows, err := r.pgDB.Query(ctx, query, userID)
	if err != nil {
		return progress_exmodel.UserTrainings{}, fmt.Errorf("progress_processrepository.GetTrainings: %w", err)
	}

	var trainings progress_exmodel.UserTrainings
	for rows.Next() {
		var g training_constructormodel.UserTraining
		err := rows.Scan(
			&g.UserTraining.TrainingID,
			&g.UserTraining.Name,
			&g.UserTraining.Description,
			&g.UserTraining.Image,
			&g.UserTraining.Type,
			&g.UserTraining.Version,
			&g.UserTraining.Price,
			&g.UserTraining.Flag,
			&g.UserTraining.Author.ID,
			&g.UserTraining.Author.Email,
			&g.UserTraining.Author.Name,
			&g.UserTraining.Author.Surname,
			&g.UserTraining.Author.NickName,
			&g.UserTraining.Author.Avatar,
			&g.UserTraining.Author.SocialMedia.TelegramURL,
			&g.UserTraining.Author.SocialMedia.VkURL,
			&g.UserTraining.Author.SocialMedia.YouTubeURL,
			&g.UserTraining.Stat.Views,
			&g.UserTraining.Stat.Favourite,
			&g.UserTraining.Stat.InTraining,
			&g.UserTraining.Stat.Rating,
			&g.UserTraining.Stat.Reviews_count,
		)
		if err != nil {
			return trainings, fmt.Errorf("progress_processrepository.GetTrainings: %w", err)
		}
		trainings.Trainings.UsersTrainings.TrainingPrograms = append(trainings.Trainings.UsersTrainings.TrainingPrograms, g.UserTraining)
	}

	return trainings, nil
}
