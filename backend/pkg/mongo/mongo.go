package mongo

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Config struct {
	Host       string `env:"MONGO_HOST" env-default:"localhost" yaml:"MONGO_HOST"`
	Port       uint16 `env:"MONGO_PORT" env-default:"5432"      yaml:"MONGO_PORT"`
	Username   string `env:"MONGO_USER" env-default:"root"      yaml:"MONGO_USER"`
	Password   string `env:"MONGO_PASS" env-default:"1234"      yaml:"MONGO_PASS"`
	Name       string `env:"MONGO_DB"   env-default:"MONGO_DB"  yaml:"MONGO_DB"`
	WorkSpace  string `env:"MONGO_WORK_SPACE"   env-default:"MONGO_WORK_SPACE"  yaml:"MONGO_WORK_SPACE"`
	Collection string `env:"MONGO_COLLECTION"   env-default:"MONGO_COLLECTION"  yaml:"MONGO_COLLECTION"`
}

func NewMongo(cfg Config) (*mongo.Database, error) {
	uri := fmt.Sprintf("%s://%s:%s@%s:%d//?authSource=%s",
		cfg.Name,
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.WorkSpace,
	)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, fmt.Errorf("failed connect mongo.NewMongo: %w", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		return nil, fmt.Errorf("failed ping mongo.NewMongo: %w", err)
	}

	mongoDB := client.Database(cfg.Collection)

	return mongoDB, nil
}

func DeferFunc(ctx context.Context, client mongo.Client) {
	if err := client.Disconnect(ctx); err != nil {
		log.Printf("Failed to disconnect Mongo: %s", err)
	}
}
