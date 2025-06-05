package users_searching_repository

import (
	users_searching_models "HSMGv2/internal/users_searching/models"
	"context"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	searchQuery = `SELECT 
		u.user_id,
		u.email,
		u.name,
		u.surname,
		u.nickname,
		u.image,
		sm.telegram_url,
		sm.vk_url,
		sm.youtube_url,
		CASE 
			WHEN f.friendship_id IS NOT NULL THEN TRUE
			ELSE FALSE
		END AS is_friend
	FROM 
		users u
	LEFT JOIN 
		social_media sm ON sm.user_id = u.user_id`
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Get(ctx context.Context, userID int, filter users_searching_models.UserFilter) (users_searching_models.Users, error) {
	var params []interface{}
	paramCount := 1
	query := searchQuery

	query += " LEFT JOIN friendship f ON (1=0"

	if userID > 0 {
		query += fmt.Sprintf(" OR (f.user_id = $%d AND f.friend_id = u.user_id)", paramCount)
		params = append(params, userID)
		paramCount++
	}
	query += ")"

	var whereClauses []string
	if filter.SearchBar != nil && *filter.SearchBar != "" {
		searchTerm := "%" + strings.ToLower(*filter.SearchBar) + "%"
		whereClauses = append(whereClauses,
			fmt.Sprintf("(LOWER(u.nickname) LIKE $%d OR LOWER(u.name) LIKE $%d OR LOWER(u.surname) LIKE $%d)",
				paramCount, paramCount, paramCount))
		params = append(params, searchTerm)
	}
	if len(whereClauses) > 0 {
		query += fmt.Sprintf(" WHERE %s", whereClauses[0])
		//query.WriteString(" WHERE ")
		//query.WriteString(strings.Join(whereClauses, " AND "))
	}

	rows, err := r.pgDB.Query(ctx, query, params...)
	if err != nil {
		return users_searching_models.Users{}, fmt.Errorf("users_searching_repository.Get: failed to execute query: %w", err)
	}
	defer rows.Close()

	var users users_searching_models.Users
	for rows.Next() {
		var user users_searching_models.UserWithFriendStatus
		err := rows.Scan(
			&user.User.ID,
			&user.User.Email,
			&user.User.Name,
			&user.User.Surname,
			&user.User.NickName,
			&user.User.Avatar,
			&user.User.SocialMedia.TelegramURL,
			&user.User.SocialMedia.VkURL,
			&user.User.SocialMedia.YouTubeURL,
			&user.IsFriend,
		)
		if err != nil {
			return users_searching_models.Users{}, fmt.Errorf("users_searching_repository.Get: failed to scan row: %w", err)
		}
		users.UserWithFriendStatus = append(users.UserWithFriendStatus, user)
	}

	if err := rows.Err(); err != nil {
		return users_searching_models.Users{}, fmt.Errorf("users_searching_repository.Get: rows error: %w", err)
	}

	return users, nil
}
