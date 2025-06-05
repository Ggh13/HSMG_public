package fried_subscr_repository

import (
	fried_subscr_model "HSMGv2/internal/friend_subscr/model"
	usermodel "HSMGv2/internal/user/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	putQuery    = `INSERT INTO friendship (user_id, friend_id) VALUES($1, $2)`
	deleteQuery = `DELETE FROM friendship WHERE user_id = $1 AND friend_id = $2`
	getQuery    = `SELECT 
		u.user_id,
		u.email,
		u.name,
		u.surname,
		u.nickname,
		u.image,
		sm.telegram_url,
		sm.vk_url,
		sm.youtube_url
	FROM 
		friendship f
	LEFT JOIN
		users u ON (f.friend_id = u.user_id)
	LEFT JOIN 
		social_media sm ON sm.user_id = u.user_id
	WHERE f.user_id = $1`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Put(ctx context.Context, userID int, friendID int) error {
	_, err := r.pgDB.Exec(ctx, putQuery, userID, friendID)
	if err != nil {
		return fmt.Errorf("fried_subscr_repository.Put: %w", err)
	}

	return nil
}

func (r *Repository) Delete(ctx context.Context, userID int, friendID int) error {
	_, err := r.pgDB.Exec(ctx, deleteQuery, userID, friendID)
	if err != nil {
		return fmt.Errorf("fried_subscr_repository.Delete: %w", err)
	}

	return nil
}

func (r *Repository) Get(ctx context.Context, userID int) (fried_subscr_model.Users, error) {
	var users fried_subscr_model.Users
	rows, err := r.pgDB.Query(ctx, getQuery, userID)
	if err != nil {
		return fried_subscr_model.Users{}, fmt.Errorf("fried_subscr_repository.Get: %w", err)
	}

	for rows.Next() {
		var user usermodel.User
		err := rows.Scan(
			&user.ID,
			&user.Email,
			&user.Name,
			&user.Surname,
			&user.NickName,
			&user.Avatar,
			&user.SocialMedia.TelegramURL,
			&user.SocialMedia.VkURL,
			&user.SocialMedia.YouTubeURL,
		)
		if err != nil {
			return fried_subscr_model.Users{}, fmt.Errorf("users_searching_repository.Get: failed to scan row: %w", err)
		}
		users.Users = append(users.Users, user)
	}

	return users, nil
}
