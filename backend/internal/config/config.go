package config

import (
	"HSMGv2/pkg/mongo"
	"HSMGv2/pkg/postgres"
	"HSMGv2/pkg/redis"
	"context"
	"fmt"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	PostgresCFG postgres.Config `env:"POSTGRES" env-default:"POSTGRES" yaml:"POSTGRES"`
	MongoCFG    mongo.Config    `env:"MONGO" env-default:"MONGO" yaml:"MONGO"`
	RedisCFG    redis.Config    `env:"REDIS" env-default:"REDIS" yaml:"REDIS"`

	RestHost    string `env:"REST_HOST" env-default:"REST_HOST" yaml:"REST_HOST"`
	RestPort    string `env:"REST_PORT" env-default:"REST_PORT" yaml:"REST_PORT"`
	FrontendURL string `env:"FRONTEND_URL" env-default:"FRONTEND_URL" yaml:"FRONTEND_URL"`
}

func NewConfig(ctx context.Context) (*Config, error) {
	var cfg Config

	configPath := os.Getenv("CONFIG_PATH")
	if configPath == "" {
		configPath = "./config/config.yaml"
	}

	err := cleanenv.ReadConfig(configPath, &cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to load config/NewConfig: %w", err)
	}

	return &cfg, nil
}
