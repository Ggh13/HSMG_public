package redis

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type Config struct {
	Host        string `env:"REDIS_HOST" env-default:"localhost" yaml:"REDIS_HOST"`
	Port        int    `env:"REDIS_PORT" env-default:"6379" yaml:"REDIS_PORT"`
	Password    string `env:"REDIS_PASS" env-default:"1234" yaml:"REDIS_PASS"`
	User        string `env:"REDIS_USER" env-default:"root" yaml:"REDIS_USER"`
	DB          int    `env:"REDIS_DB" env-default:"0" yaml:"REDIS_DB"`
	MaxRetries  int    `env:"REDIS_MAX_RETRIES" env-default:"5" yaml:"REDIS_MAX_RETRIES"`
	DialTimeout int    `env:"REDIS_DIAL_TIMEOUT" env-default:"10" yaml:"REDIS_DIAL_TIMEOUT"`
	Timeout     int    `env:"REDIS_TIMEOUT" env-default:"5" yaml:"REDIS_TIMEOUT"`
}

func New(ctx context.Context, cfg Config) (*redis.Client, error) {
	uri := fmt.Sprintf("%s:%d", cfg.Host, cfg.Port)
	db := redis.NewClient(&redis.Options{
		Addr:         uri,
		Password:     cfg.Password,
		DB:           cfg.DB,
		Username:     cfg.User,
		MaxRetries:   cfg.MaxRetries,
		DialTimeout:  time.Duration(cfg.DialTimeout) * time.Second,
		ReadTimeout:  time.Duration(cfg.Timeout) * time.Second,
		WriteTimeout: time.Duration(cfg.Timeout) * time.Second,
	})
	fmt.Print(cfg)

	if err := db.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("redis.New: %w", err)
	}

	return db, nil
}
