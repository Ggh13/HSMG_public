package userrepository

import (
	usermodel "HSMGv2/internal/user/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	//defaultImageURL = ""

	userGetQuerySQL = `SELECT user_id, email, name, surname, nickname, image
						FROM users
						WHERE user_id = $1`
	socialMediaGetQuerySQL = `SELECT telegram_url, vk_url, youtube_url
								 FROM social_media
								 WHERE user_id = $1`
	userUpdateQuerySQL = `UPDATE users
								SET email = $1, name = $2, surname = $3, nickname = $4, image = $5
								WHERE user_id = $6`
	socialMediaUpdateQuerySQL = `UPDATE social_media
								SET telegram_url = $1, vk_url = $2, youtube_url = $3
								WHERE user_id = $4`
	createSocilaMedia = `INSERT INTO social_media (user_id)
						SELECT $1
						WHERE NOT EXISTS (
							SELECT 1 FROM social_media WHERE user_id = $1
						)`

	//userGetQueryMongo    = ""
	//userUpdateQueryMongo = ""
	//getImageS3           = ""
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Get(ctx context.Context, user_id int) (usermodel.User, error) {
	var user usermodel.User
	err := r.pgDB.QueryRow(ctx, userGetQuerySQL, user_id).Scan(
		&user.ID,
		&user.Email,
		&user.Name,
		&user.Surname,
		&user.NickName,
		&user.Avatar,
	)
	if err != nil {
		return usermodel.User{}, fmt.Errorf("userrepository.Get: %w", err)
	}

	user.SocialMedia, err = r.GetSocialMedia(ctx, user_id)
	if err != nil {
		return usermodel.User{}, err
	}

	return user, nil
}

func (r *Repository) GetSocialMedia(ctx context.Context, user_id int) (usermodel.SocialMedia, error) {
	err := r.CreateSocilaMedia(ctx, user_id)
	if err != nil {
		return usermodel.SocialMedia{}, err
	}

	var socialMedia usermodel.SocialMedia
	err = r.pgDB.QueryRow(ctx, socialMediaGetQuerySQL, user_id).Scan(
		&socialMedia.TelegramURL,
		&socialMedia.VkURL,
		&socialMedia.YouTubeURL)
	if err != nil {
		return usermodel.SocialMedia{}, fmt.Errorf("userrepository.GetSocialMedia: %w", err)
	}
	return socialMedia, nil
}

func (r *Repository) UpdateUserSQL(ctx context.Context, user usermodel.User) error {
	_, err := r.pgDB.Exec(ctx, userUpdateQuerySQL,
		user.Email,
		user.Name,
		user.Surname,
		user.NickName,
		user.Avatar,
		user.ID)
	if err != nil {
		return fmt.Errorf("userrepository.UpdateUserSQL: %w", err)
	}
	return nil
}

func (r *Repository) UpdateSocialMediaSQL(ctx context.Context, user_id int, user usermodel.SocialMedia) error {
	err := r.CreateSocilaMedia(ctx, user_id)
	if err != nil {
		return err
	}

	_, err = r.pgDB.Exec(ctx, socialMediaUpdateQuerySQL,
		user.TelegramURL,
		user.VkURL,
		user.YouTubeURL,
		user_id)
	if err != nil {
		return fmt.Errorf("userrepository.UpdateSocialMediaSQL: %w", err)
	}
	return nil
}

func (r *Repository) UpdateUserMongo(ctx context.Context, user_id int) (usermodel.User, error) {
	return usermodel.User{}, nil
}

func (r *Repository) CreateSocilaMedia(ctx context.Context, user_id int) error {
	_, err := r.pgDB.Exec(ctx, createSocilaMedia, user_id)
	if err != nil {
		return fmt.Errorf("authrepository.CreateSocialMedia: %w", err)
	}
	return nil
}
