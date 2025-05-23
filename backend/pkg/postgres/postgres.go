package postgres

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Config struct {
	Host     string `env:"POSTGRES_HOST" env-default:"localhost" yaml:"POSTGRES_HOST"`
	Port     uint16 `env:"POSTGRES_PORT" env-default:"5432"      yaml:"POSTGRES_PORT"`
	Username string `env:"POSTGRES_USER" env-default:"root"      yaml:"POSTGRES_USER"`
	Password string `env:"POSTGRES_PASS" env-default:"1234"      yaml:"POSTGRES_PASS"`
	Name     string `env:"POSTGRES_DB"   env-default:"postgres"  yaml:"POSTGRES_DB"`

	MinConns int32 `env:"POSTGRES_MIN_CONN" env-default:"2"  yaml:"POSTGRES_MIN_CONN"`
	MaxConns int32 `env:"POSTGRES_MAX_CONN" env-default:"10" yaml:"POSTGRES_MAX_CONN"`
}

func NewPostgres(ctx context.Context, cfg *Config) (*pgxpool.Pool, error) {
	connString := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable&pool_max_conns=%d&pool_min_conns=%d",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.Name,
		cfg.MaxConns,
		cfg.MinConns,
	)

	conn, err := pgxpool.New(ctx, connString)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	return conn, nil
}
