package anthropometry_stat_repository

import (
	anthropometrymodel "HSMGv2/internal/anthropometry/general/model"
	anthropometry_stat_model "HSMGv2/internal/anthropometry/statistic/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	statQuery = `SELECT id,
						user_id,
						height,
						weight,
						neck_girth,
						shoulder_girth,
						chest_girth,
						waist_girth,
						biceps_girth,
						forearms_girth,
						hip_girth,
						quadriceps_girth,
						calf_girth,
						wrist_girth,
						ankle_girth,
						date
					FROM public.anthropometry
					WHERE user_id = $1`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDb *mongo.Database
}

func NewRepository(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDb: mongoDB}
}

func (r *Repository) Get(ctx context.Context, userID int, filter anthropometry_stat_model.Filter,
) (anthropometry_stat_model.AnthropometryStat, error) {
	query := statQuery
	params := []interface{}{}
	params = append(params, userID)
	paramCount := 2

	if filter.StartDate != nil {
		query += fmt.Sprintf(" AND date >= $%d", paramCount)
		params = append(params, *filter.StartDate)
		paramCount++
	}
	if filter.EndDate != nil {
		query += fmt.Sprintf(" AND date <= $%d", paramCount)
		params = append(params, *filter.EndDate)
	}
	query += " ORDER BY date ASC"

	rows, err := r.pgDB.Query(ctx, query, params...)
	if err != nil {
		return anthropometry_stat_model.AnthropometryStat{}, fmt.Errorf("anthropometry_stat_repository.Get: %w", err)
	}

	var stat anthropometry_stat_model.AnthropometryStat
	for rows.Next() {
		var anthr anthropometrymodel.Anthropometry
		err := rows.Scan(
			&anthr.ID,
			&anthr.UserID,
			&anthr.Height,
			&anthr.Weight,
			&anthr.NeckGirth,
			&anthr.ShoulderGirth,
			&anthr.ChestGirth,
			&anthr.WaistGirth,
			&anthr.BicepsGirth,
			&anthr.ForearmsGirth,
			&anthr.HipGirth,
			&anthr.QuadricepsGirth,
			&anthr.CalfGirth,
			&anthr.WristGirth,
			&anthr.AnkleGirth,
			&anthr.Date,
		)
		if err != nil {
			return anthropometry_stat_model.AnthropometryStat{}, fmt.Errorf("anthropometry_stat_repository.Get: %w", err)
		}
		stat.Stat = append(stat.Stat, anthr)
	}

	return stat, nil
}
