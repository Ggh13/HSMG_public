package trainingfavouriterepository

import (
	trainingfavouritemodel "HSMGv2/internal/training_favourite/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	addToFavouriteQuerySQL = `INSERT INTO training_favourite (user_id, training_id)
							VALUES ($1, $2)`
	removeFromFavouriteQuerySQL = `DELETE FROM training_favourite 
							WHERE user_id = $1 AND training_id = $2`
	getFavouriteTrainingsQuerySQL = `SELECT 
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
				training_favourite tf 
			JOIN 
				public.training_programs tp ON tp.training_id = tf.training_id
			JOIN 
				users u ON tp.author_id = u.user_id
			LEFT JOIN 
				social_media sm ON u.user_id = sm.user_id
			JOIN 
				statistic_training st ON st.training_id = tp.training_id
			WHERE 
				tf.user_id = $1 AND tp.flag = 1;`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Add(ctx context.Context, training_id int, user_id int) error {
	_, err := r.pgDB.Exec(ctx, addToFavouriteQuerySQL, user_id, training_id)
	if err != nil {
		return fmt.Errorf("trainingfavouriterepository.Add: %w", err)
	}
	return nil
}

func (r *Repository) Remove(ctx context.Context, training_id int, user_id int) error {
	_, err := r.pgDB.Exec(ctx, removeFromFavouriteQuerySQL, user_id, training_id)
	if err != nil {
		return fmt.Errorf("trainingfavouriterepository.Remove: %w", err)
	}
	return nil
}

func (r *Repository) Get(ctx context.Context, user_id int) (trainingfavouritemodel.FavouritesTrainings, error) {
	var programs trainingfavouritemodel.FavouritesTrainings
	rows, err := r.pgDB.Query(ctx, getFavouriteTrainingsQuerySQL, user_id)
	if err != nil {
		return trainingfavouritemodel.FavouritesTrainings{}, fmt.Errorf("searching_training_repository.Find: %w", err)
	}

	for rows.Next() {
		var g trainingfavouritemodel.TrainingFavourite
		err := rows.Scan(
			&g.TrainingID,
			&g.Name,
			&g.Description,
			&g.Image,
			&g.Type,
			&g.Version,
			&g.Price,
			&g.Flag,
			&g.Author.ID,
			&g.Author.Email,
			&g.Author.Name,
			&g.Author.Surname,
			&g.Author.NickName,
			&g.Author.Avatar,
			&g.Author.SocialMedia.TelegramURL,
			&g.Author.SocialMedia.VkURL,
			&g.Author.SocialMedia.YouTubeURL,
			&g.Stat.Views,
			&g.Stat.Favourite,
			&g.Stat.InTraining,
			&g.Stat.Rating,
			&g.Stat.Reviews_count,
		)
		if err != nil {
			return trainingfavouritemodel.FavouritesTrainings{}, fmt.Errorf("favourite_training_repository.Find: %w", err)
		}

		programs.Favourite.TrainingPrograms = append(programs.Favourite.TrainingPrograms, g.GeneralTrainingInfo)
	}

	return programs, nil
}
