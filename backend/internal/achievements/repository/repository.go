package achievements_repository

import (
	achievements_model "HSMGv2/internal/achievements/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	getUserAchievementsQuery = `SELECT 
								achievement_id,
								exercise_id,
								name,
								image,
								weight,
								count,
								achievement_date,
								video_record
								FROM achievements
								WHERE user_id = $1`
	deleteAchievements = `DELETE FROM achievements WHERE achievement_id = $1`
	createAchievement  = `INSERT INTO achievements (
						 exercise_id,
						 name,
						 achievement_date,
						 weight,
						 count,
						 image,
						 video_record, 
						 user_id)
						 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	getBestAproaches = `SELECT DISTINCT ON (de.id_exercises)
						de.id_exercises AS exercise_id,
						de.name AS name_exercise,
						de.date,
						de.weight_done AS done_weigth,
						de.count_done AS done_count,
						de.image,
						de.process_video AS video_record
					FROM done_exercises de
					WHERE de.user_id = $1
					ORDER BY de.id_exercises, de.weight_done DESC, de.date ASC`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func New(pgDB *pgxpool.Pool, mondoDB *mongo.Database) Repository {
	return Repository{pgDB: pgDB, mongoDB: mondoDB}
}

func (r *Repository) Get(ctx context.Context, userID int, isAuth bool,
) (achievements_model.Achievements, error) {
	rows, err := r.pgDB.Query(ctx, getUserAchievementsQuery, userID)
	if err != nil {
		return achievements_model.Achievements{}, fmt.Errorf("achievements_repository.Get: %w", err)
	}

	var achievements achievements_model.Achievements
	for rows.Next() {
		var a achievements_model.Achievement
		err := rows.Scan(
			&a.AchievementID,
			&a.ExerciseID,
			&a.NameExercise,
			&a.Image,
			&a.Weight,
			&a.Count,
			&a.Date,
			&a.VideoRecord)
		if err != nil {
			return achievements_model.Achievements{}, fmt.Errorf("achievements_repository.Get: %w", err)
		}

		achievements.Achievements = append(achievements.Achievements, a)
	}

	return achievements, nil
}

func (r *Repository) GetBestAproaches(ctx context.Context, userID int) (achievements_model.BestApproaches, error) {
	rows, err := r.pgDB.Query(ctx, getBestAproaches, userID)
	if err != nil {
		return achievements_model.BestApproaches{}, fmt.Errorf("achievements_repository.GetBestAproaches: %w", err)
	}

	var best achievements_model.BestApproaches
	for rows.Next() {
		var apr achievements_model.BestApproach
		err := rows.Scan(
			&apr.ExerciseID,
			&apr.NameExercise,
			&apr.Date,
			&apr.DoneWeigth,
			&apr.DoneCount,
			&apr.Image,
			&apr.VideoRecord)
		if err != nil {
			return achievements_model.BestApproaches{}, fmt.Errorf("achievements_repository.GetBestAproaches: %w", err)
		}

		best.Approaches = append(best.Approaches, apr)
	}

	return best, nil
}

func (r *Repository) Create(ctx context.Context, userID int, apr achievements_model.Achievement) error {
	_, err := r.pgDB.Exec(ctx, createAchievement,
		apr.ExerciseID,
		apr.NameExercise,
		apr.Date,
		apr.Weight,
		apr.Count,
		apr.Image,
		apr.VideoRecord,
		userID)
	if err != nil {
		return fmt.Errorf("achievements_repository.Create: %w", err)
	}

	return nil
}

func (r *Repository) Delete(ctx context.Context, achievementID int) error {
	_, err := r.pgDB.Exec(ctx, deleteAchievements, achievementID)
	if err != nil {
		return fmt.Errorf("achievements_repository.Delete^ %w", err)
	}

	return nil
}
