package anthropometryrepository

import (
	anthropometrymodel "HSMGv2/internal/anthropometry/general/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

const (
	putQuery = `INSERT INTO public.anthropometry 
					(user_id, 
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
					ankle_girth)
					VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`
	deleteQuery = `DELETE FROM anthropometry 
					WHERE user_id = $1 AND date >= (NOW() - INTERVAL '1 day')`
	getQuery = `SELECT id,
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
	checkQuery = `SELECT EXISTS(
                SELECT 1 FROM anthropometry 
                WHERE user_id = $1 AND date >= (NOW() - INTERVAL '1 day')
              )`
)

func (r *Repository) Put(ctx context.Context, anthr anthropometrymodel.Anthropometry, userID int) error {
	_, err := r.pgDB.Exec(ctx, putQuery,
		userID,
		anthr.Height,
		anthr.Weight,
		anthr.NeckGirth,
		anthr.ShoulderGirth,
		anthr.ChestGirth,
		anthr.WaistGirth,
		anthr.BicepsGirth,
		anthr.ForearmsGirth,
		anthr.HipGirth,
		anthr.QuadricepsGirth,
		anthr.CalfGirth,
		anthr.WristGirth,
		anthr.AnkleGirth,
	)
	if err != nil {
		return fmt.Errorf("anthropometryrepository.Put: %w", err)
	}

	return nil
}

func (r *Repository) Delete(ctx context.Context, userID int) error {
	_, err := r.pgDB.Exec(ctx, deleteQuery, userID)
	if err != nil {
		return fmt.Errorf("anthropometryrepository.Delete: %w", err)
	}

	return nil
}

func (r *Repository) Get(ctx context.Context, userID int) (anthropometrymodel.Anthropometry, error) {
	var anthr anthropometrymodel.Anthropometry

	err := r.pgDB.QueryRow(ctx, getQuery, userID).Scan(
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
	if err == pgx.ErrNoRows {
		return anthropometrymodel.Anthropometry{}, err
	}
	if err != nil {
		return anthropometrymodel.Anthropometry{}, fmt.Errorf("anthropometryrepository.Get: %w", err)
	}

	return anthr, err
}

func (r *Repository) CheckExists(ctx context.Context, userID int) (bool, error) {
	flag := false
	err := r.pgDB.QueryRow(ctx, checkQuery, userID).Scan(&flag)
	if err != nil {
		return false, fmt.Errorf("anthropometryrepository.CheckExists: %w", err)
	}
	return flag, nil
}
