package statisticrepository

import (
	"context"
	"fmt"
	"time"

	statisticmodel "HSMGv2/internal/statistic/model"

	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	selectStatics = `SELECT date::date, MAX(weight_done) AS max_weight_done 
					 FROM public.done_exercises 
					 WHERE id_exercises = $1 
					 AND user_id = $2 
					 GROUP BY DATE(date)
					  ORDER BY DATE(date)`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) GetTraining(ctx context.Context, staticRequest statisticmodel.StatisticExersiceRequest) (statisticmodel.StatisticByExersice, error) {
	var result statisticmodel.StatisticByExersice
	result.Graph = make(map[string]float64)
	rows, err := r.pgDB.Query(ctx, selectStatics, staticRequest.IdExercise, staticRequest.UserId)
	if err != nil {
		return result, err
	}
	defer rows.Close()

	for rows.Next() {
		var date time.Time
		var count float64
		if err := rows.Scan(&date, &count); err != nil {
			return result, fmt.Errorf("statistics.GetTraining (SQL): %w", err)
		}

		result.Graph[date.Format("2006-01-02 15:04:05.999")] = count

	}

	err = rows.Err()
	if err == pgx.ErrNoRows {
		return result, err
	} else if err != nil {
		return result, fmt.Errorf("statistics.GetTraining: %w", err)
	}

	return result, nil
}
