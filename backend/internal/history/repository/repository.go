package librariesrepository

import (
	history_model "HSMGv2/internal/history/model"
	training_constructormodel "HSMGv2/internal/training_constructor/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	SelectAllExersiceHistory = `
	SELECT
		de.id_exercises,
		e.name AS exercise_name,
		de.count_done,
		de.weight_done,
		de.date ::text            
	FROM public.done_exercises de
	INNER JOIN public.exercises_library e 
		ON de.id_exercises = e.exercise_id 
	WHERE de.user_id = $1 ORDER BY de.date DESC;; `
	SelectAllExersice = `SELECT exercise_id	, name, video FROM exercises_library`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) GetExerciseHistory(ctx context.Context, userId int) (bool, []history_model.ExerciseWithDate, error) {
	var exercises []history_model.ExerciseWithDate
	rows, err := r.pgDB.Query(ctx, SelectAllExersiceHistory, userId)
	if err != nil {
		return false, exercises, fmt.Errorf("library.GetAll: %w", err)
	}

	for rows.Next() {
		var g history_model.ExerciseWithDate
		var g1 training_constructormodel.Approach

		err := rows.Scan(
			&g.Training_ex.ExerciseID,
			&g.Training_ex.Name,
			&g1.InProgressEx.DoneCount,
			&g1.InProgressEx.DoneWeight,
			&g.Date,
		)
		if err != nil {
			return false, exercises, fmt.Errorf(":libraries.GetAll: %w", err)
		}

		g.Training_ex.Approaches = append(g.Training_ex.Approaches, g1)
		exercises = append(exercises, g)
	}
	return true, exercises, nil
}
