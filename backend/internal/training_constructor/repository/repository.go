package trainingrepository

import (
	training_constructormodel "HSMGv2/internal/training_constructor/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

const (
	InsertQuery        = "INSERT INTO public.training_programs (name, description, type, image, author_id, version) VALUES($1, $2, $3, $4, $5, $6) RETURNING training_id"
	UpdateQuery        = "UPDATE public.training_programs SET name = $1, description = $2, type = $3, image = $4, author_id = $5, version = $6 WHERE training_id = $7"
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
							public.training_programs tp
						LEFT JOIN 
							users u ON tp.author_id = u.user_id
						LEFT JOIN 
							social_media sm ON u.user_id = sm.user_id
						LEFT JOIN 
							statistic_training st ON st.training_id = tp.training_id
						WHERE 
							u.user_id = $1`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) GetMongo(ctx context.Context, id int) (training_constructormodel.Training, error) {
	var training_constructor training_constructormodel.Training
	collection := r.mongoDB.Collection("training_programs")

	err := collection.FindOne(context.TODO(), bson.M{"training_id": id}).Decode(&training_constructor)
	if err != nil {
		return training_constructormodel.Training{}, fmt.Errorf("trainingrepository.GetMongo: %w", err)
	}

	return training_constructor, nil
}

func (r *Repository) AddPsg(ctx context.Context, trainng_program training_constructormodel.Training) (int, bool, error) {
	var id_saved int
	err := r.pgDB.QueryRow(
		context.Background(),
		InsertQuery,
		trainng_program.Name,
		trainng_program.Description,
		trainng_program.Type,
		trainng_program.Image,
		trainng_program.Author.ID,
		1,
	).Scan(&id_saved)

	if err != nil {
		return -1, false, fmt.Errorf("trainingrepository.AddPsg: %w", err)
	}

	return id_saved, true, nil
}

func (r *Repository) UpdatePsg(ctx context.Context, trainng_program training_constructormodel.Training) (bool, error) {
	trainng_program.Version = trainng_program.Version + 1
	_, err := r.pgDB.Exec(context.Background(), UpdateQuery,
		trainng_program.Name,
		trainng_program.Description,
		trainng_program.Type,
		trainng_program.Image,
		trainng_program.Author.ID,
		trainng_program.Version,
		trainng_program.ID,
	)

	if err != nil {
		return false, fmt.Errorf("trainingrepository.UpdatePsg: %w", err)
	}

	return true, nil

}

func (r *Repository) GetPsg(ctx context.Context, id int) (training_constructormodel.Training, error) {
	// Нужно дописать после мерджа со статистикой

	//var trainng_program training_constructormodel.Training

	return training_constructormodel.Training{}, nil

}

func (r *Repository) GetTrainings(ctx context.Context, userID int, isAuthorised bool) (training_constructormodel.UsersTrainings, error) {
	query := usersTainingsQuery
	if !isAuthorised {
		query += " AND tp.flag = 1"
	}
	rows, err := r.pgDB.Query(ctx, query, userID)
	if err != nil {
		return training_constructormodel.UsersTrainings{}, fmt.Errorf("userrepository.GetTrainings: %w", err)
	}

	var trainings training_constructormodel.UsersTrainings
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
			return trainings, fmt.Errorf("userrepository.GetTrainings: %w", err)
		}
		trainings.UsersTrainings.TrainingPrograms = append(trainings.UsersTrainings.TrainingPrograms, g.UserTraining)
	}

	return trainings, nil
}

func (r *Repository) AddMongo(ctx context.Context, trainng_program training_constructormodel.Training) (bool, error) {
	doc := trainng_program
	collection := r.mongoDB.Collection("training_programs")
	_, err := collection.InsertOne(context.TODO(), doc)
	if err != nil {
		return false, fmt.Errorf("trainingrepository.AddMongo: %w", err)
	}

	return true, nil
}

func (r *Repository) UpdateMongo(ctx context.Context, training_program training_constructormodel.Training) (bool, error) {

	collection := r.mongoDB.Collection("training_programs")
	training_program.Version = training_program.Version + 1
	update := bson.M{
		"$set": training_program,
	}

	filter := bson.M{"training_id": training_program.ID}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return false, fmt.Errorf("trainingrepository.UpdateMongo: %w", err)
	}

	return true, nil
}
