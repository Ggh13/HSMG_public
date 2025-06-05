package trainingstatisticrepository

import (
	trainingstatisticmodel "HSMGv2/internal/training_statistic/model"
	"HSMGv2/pkg/logger"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
)

const (
	getStatQuerySQL = `SELECT views, favourite, in_training, rating, reviews_count
						FROM statistic_training
						WHERE training_id = $1`
	updateViewQuerySQL = `UPDATE statistic_training
						SET views = views + $2
						WHERE training_id = $1`
	UpdateFavouriteQuerySQL = `UPDATE statistic_training
						SET favourite = favourite + $2
						WHERE training_id = $1`
	updateInTrainingQuerySQL = `UPDATE statistic_training
						SET in_training = in_training + $2
						WHERE training_id = $1`
	updateReviewsCountQuerySQL = `UPDATE statistic_training
						SET reviews_count = reviews_count + $2
						WHERE training_id = $1`
	createStatisticQuerySQL = `INSERT INTO statistic_training (training_id)
						SELECT $1
						WHERE NOT EXISTS (
							SELECT 1 FROM statistic_training WHERE training_id = $1
						)`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Get(ctx context.Context, training_id int) (trainingstatisticmodel.StatisticTraining, error) {
	if err := r.CreateStatistic(ctx, training_id); err != nil {
		return trainingstatisticmodel.StatisticTraining{}, err
	}

	var stat trainingstatisticmodel.StatisticTraining
	err := r.pgDB.QueryRow(ctx, getStatQuerySQL, training_id).Scan(
		&stat.Views,
		&stat.Favourite,
		&stat.InTraining,
		&stat.Rating,
		&stat.Reviews_count)
	if err != nil {
		return trainingstatisticmodel.StatisticTraining{},
			fmt.Errorf("trainingstatisticmodel.Get: %w", err)
	}
	return stat, nil
}

func (r *Repository) UpdateView(ctx context.Context, training_id int, views int) error {
	err := r.CreateStatistic(ctx, training_id)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed create programStatistic", zap.Error(err))
	}

	_, err = r.pgDB.Exec(ctx, updateViewQuerySQL, training_id, views)
	if err == nil {
		return nil
	}
	return fmt.Errorf("trainingstatisticmodel.UpdateView: %w", err)
}

func (r *Repository) UpdateFavourite(ctx context.Context, training_id int, fav int) error {
	err := r.CreateStatistic(ctx, training_id)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed create programStatistic", zap.Error(err))
	}

	_, err = r.pgDB.Exec(ctx, UpdateFavouriteQuerySQL, training_id, fav)
	if err == nil {
		return nil
	}
	return fmt.Errorf("trainingstatisticmodel.UpdateFavourite: %w", err)
}

func (r *Repository) UpdateInTraining(ctx context.Context, training_id int, inTr int) error {
	err := r.CreateStatistic(ctx, training_id)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed create programStatistic", zap.Error(err))
	}

	_, err = r.pgDB.Exec(ctx, updateInTrainingQuerySQL, training_id, inTr)
	if err == nil {
		return nil
	}
	return fmt.Errorf("trainingstatisticmodel.UpdateInTraining: %w", err)
}

func (r *Repository) UpdateRewiews(ctx context.Context, training_id int, rew int) error {
	err := r.CreateStatistic(ctx, training_id)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "Failed create programStatistic", zap.Error(err))
	}

	_, err = r.pgDB.Exec(ctx, updateReviewsCountQuerySQL, training_id, rew)
	if err == nil {
		return nil
	}
	return fmt.Errorf("trainingstatisticmodel.UpdateRewiews: %w", err)
}

func (r *Repository) CreateStatistic(ctx context.Context, training_id int) error {
	_, err := r.pgDB.Exec(ctx, createStatisticQuerySQL, training_id)
	if err == nil {
		return nil
	}
	return fmt.Errorf("trainingstatisticmodel.CreateStatistic: %w", err)
}
