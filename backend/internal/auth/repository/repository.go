package authrepository

import (
	authmodel "HSMGv2/internal/auth/model"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	ExistsQuery         = "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)"
	SelectPasswordQuery = "SELECT password FROM users WHERE email = $1"
	InsertQuery         = "INSERT INTO users (email, password, name, surname, nickname) VALUES ($1, $2, $3, $4, $5)"
	IdQuery             = "SELECT user_id FROM users WHERE email = $1"
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) Exists(ctx context.Context, email string) (bool, error) {
	var exists bool

	err := r.pgDB.QueryRow(ctx, ExistsQuery, email).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("authrepository.Exists(failer scan exists user): %w", err)
	}

	return exists, nil
}

func (r *Repository) Get(ctx context.Context, email string) (string, error) {
	flag, err := r.Exists(ctx, email)
	if err != nil {
		return "", err
	}
	if !flag {
		return "", nil
	}

	var password string
	err = r.pgDB.QueryRow(ctx, SelectPasswordQuery, email).Scan(&password)
	if err != nil {
		return "", fmt.Errorf("authrepository.Get(failed scan pas user)")
	}

	return password, nil
}

func (r *Repository) Put(ctx context.Context, user authmodel.UserRegister) (bool, error) {
	flag, err := r.Exists(ctx, user.Email)
	if err != nil {
		return false, err
	}
	if flag {
		return true, nil
	}

	_, err = r.pgDB.Exec(ctx,
		InsertQuery,
		user.Email,
		user.Password,
		user.Name,
		user.Surname,
		user.NickName,
	)
	if err != nil {
		return false, fmt.Errorf("authrepository.Put(failed insert user): %w", err)
	}
	return false, nil
}

func (r *Repository) GetID(ctx context.Context, email string) (int, error) {
	var userID int
	err := r.pgDB.QueryRow(ctx, IdQuery, email).Scan(&userID)
	if err != nil {
		if err == pgx.ErrNoRows {
			return -1, nil
		}
		return -1, fmt.Errorf("authrepository.GetID(failed scan): %w", err)
	}
	return userID, nil
}
