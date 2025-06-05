package librariesrepository

import (
	librariesmodel "HSMGv2/internal/libraries/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	SelectOneExersicebyId = `SELECT exercise_id	, name, video FROM exercises_library WHERE exercise_id = $1 `
	SelectAllExersice     = `SELECT exercise_id	, name, video FROM exercises_library`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) GetOne(ctx context.Context, trainingID int) (bool, librariesmodel.Exercise, error) {
	var exercise librariesmodel.Exercise
	err := r.pgDB.QueryRow(
		context.Background(),
		SelectOneExersicebyId,
		trainingID,
	).Scan(&exercise.Id, &exercise.Name, &exercise.Link)

	if err != nil {
		return false, exercise, fmt.Errorf(":libraries.GetOne: %w", err)
	}

	return true, exercise, nil
}

func (r *Repository) GetAll(ctx context.Context) (bool, librariesmodel.Exercises, error) {
	var exercises librariesmodel.Exercises
	rows, err := r.pgDB.Query(ctx, SelectAllExersice)
	if err != nil {
		return false, exercises, fmt.Errorf("library.GetAll: %w", err)
	}

	for rows.Next() {
		var g librariesmodel.Exercise
		err := rows.Scan(
			&g.Id,
			&g.Name,
			&g.Link,
		)
		if err != nil {
			return false, exercises, fmt.Errorf(":libraries.GetAll: %w", err)
		}
		exercises.Exercises = append(exercises.Exercises, g)
	}
	return true, exercises, nil
}
