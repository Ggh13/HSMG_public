package searching_training_repository

import (
	searching_training_model "HSMGv2/internal/training_searching/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	getQuery = `SELECT 
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
			JOIN 
				users u ON tp.author_id = u.user_id
			LEFT JOIN 
				social_media sm ON u.user_id = sm.user_id
			JOIN 
				statistic_training st ON st.training_id = tp.training_id
			WHERE 
				tp.training_id = $1 AND tp.flag = 1;`
	findQuery = `SELECT 
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
				tp.flag = 1`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func New(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Get(ctx context.Context, trainingID int,
) (searching_training_model.GeneralTrainingInfo, error) {
	var g searching_training_model.GeneralTrainingInfo
	err := r.pgDB.QueryRow(ctx, getQuery, trainingID).Scan(
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
		return searching_training_model.GeneralTrainingInfo{}, fmt.Errorf("searching_training_repository: %w", err)
	}

	return g, nil
}

func (r *Repository) Find(ctx context.Context, filter searching_training_model.TrainingFilter,
) (searching_training_model.TrainingPrograms, error) {
	var trainings searching_training_model.TrainingPrograms
	query := findQuery
	params := []interface{}{}
	paramCount := 1

	if filter.SearchBar != nil {
		query += fmt.Sprintf(" AND tp.name ILIKE $%d", paramCount)
		params = append(params, "%"+*filter.SearchBar+"%")
		paramCount++
	}
	if filter.Rating != nil {
		query += fmt.Sprintf(" AND st.rating >= $%d", paramCount)
		params = append(params, *filter.Rating)
		paramCount++
	}
	if filter.FavouriteCnt != nil {
		query += fmt.Sprintf(" AND st.favourite >= $%d", paramCount)
		params = append(params, *filter.FavouriteCnt)
		paramCount++
	}
	//if filter.IDTrainingType != nil {
	//query += fmt.Sprintf(" AND tp.type = $%d", paramCount)
	//params = append(params, *filter.IDTrainingType)
	//paramCount++
	//}
	if filter.PriceMin != nil {
		query += fmt.Sprintf(" AND tp.price >= $%d", paramCount)
		params = append(params, *filter.PriceMin)
		paramCount++
	}
	if filter.PriceMax != nil {
		query += fmt.Sprintf(" AND tp.price <= $%d", paramCount)
		params = append(params, *filter.PriceMax)
		paramCount++
	}
	if filter.ViewsMin != nil {
		query += fmt.Sprintf(" AND st.views >= $%d", paramCount)
		params = append(params, *filter.ViewsMin)
		paramCount++
	}
	if filter.InTrainingCnt != nil {
		query += fmt.Sprintf(" AND st.in_training >= $%d", paramCount)
		params = append(params, *filter.InTrainingCnt)
		//paramCount++
	}
	query += " LIMIT 10"
	//query += " ORDER BY st.views DESC"
	rows, err := r.pgDB.Query(ctx, query, params...)
	if err != nil {
		return searching_training_model.TrainingPrograms{}, fmt.Errorf("searching_training_repository.Find: %w", err)
	}

	for rows.Next() {
		var g searching_training_model.GeneralTrainingInfo
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
			return searching_training_model.TrainingPrograms{}, fmt.Errorf("searching_training_repository.Find: %w", err)
		}

		trainings.TrainingPrograms = append(trainings.TrainingPrograms, g)
	}

	return trainings, nil
}
