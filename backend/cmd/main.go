package main

import (
	authhandler "HSMGv2/internal/auth/handler"
	authrepository "HSMGv2/internal/auth/repository"
	authtransport "HSMGv2/internal/auth/router"
	authservice "HSMGv2/internal/auth/service"
	"HSMGv2/internal/config"
	server "HSMGv2/internal/transport/rest"
	userhandler "HSMGv2/internal/user/handler"
	userrepository "HSMGv2/internal/user/repository"
	usertransport "HSMGv2/internal/user/router"
	userservice "HSMGv2/internal/user/service"

	trainingconstructorhandler "HSMGv2/internal/training_constructor/handler"
	trainingconstructorrepository "HSMGv2/internal/training_constructor/repository"
	trainingconstructortransport "HSMGv2/internal/training_constructor/router"
	trainingconstructorservice "HSMGv2/internal/training_constructor/service"

	"HSMGv2/pkg/logger"
	"HSMGv2/pkg/mongo"
	"HSMGv2/pkg/postgres"
	"context"
	"os"
	"os/signal"

	"go.uber.org/zap"
)

func main() {
	ctx := context.Background()

	ctx, _ = logger.NewLogger(ctx)

	ctx, stop := signal.NotifyContext(ctx, os.Interrupt)
	defer stop()

	config, err := config.NewConfig(ctx)

	if err != nil {
		logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failed load logger", zap.Error(err))
	}
	logger.GetLoggerFromCtx(ctx).Info(ctx, "Succesfully load config")

	pgDB, err := postgres.NewPostgres(ctx, &config.PostgresCFG)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failsed connect to postgres DB", zap.Error(err))
	}
	if err := pgDB.Ping(ctx); err != nil {
		logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failed ping pgDB", zap.Error(err))
	}
	logger.GetLoggerFromCtx(ctx).Info(ctx, "Succesfully connected to pgDB")

	mongoDB, err := mongo.NewMongo(config.MongoCFG)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failed connect mongo DB", zap.Error(err))
	}
	if err := mongoDB.Client().Ping(ctx, nil); err != nil {
		logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failed ping mongoDB", zap.Error(err))
	}
	logger.GetLoggerFromCtx(ctx).Info(ctx, "Succesfully connected mongoDB")

	r, err := server.NewRouter(ctx, config)
	if err != nil {
		logger.GetLoggerFromCtx(ctx).Info(ctx, "")
	}

	// Auth
	authRepo := authrepository.NewRepository(ctx, pgDB, mongoDB)
	authServ := authservice.NewService(ctx, authRepo)
	authHadl := authhandler.NewHandler(authServ)
	authtransport.Transport(r.RestServe, authHadl, ctx)

	// User
	userRepo := userrepository.NewRepository(pgDB, mongoDB)
	userServ := userservice.NewService(ctx, userRepo)
	userHandl := userhandler.NewHandler(ctx, userServ)
	usertransport.Transport(r.RestServe, userHandl, ctx)

	//Training programs
	trainingconstructorRepo := trainingconstructorrepository.NewRepository(ctx, pgDB, mongoDB)
	trainingconstructorServ := trainingconstructorservice.NewService(ctx, trainingconstructorRepo)
	trainingconstructorHandl := trainingconstructorhandler.NewHandler(trainingconstructorServ)
	trainingconstructortransport.Transport(r.RestServe, trainingconstructorHandl, ctx)

	r.Run(ctx)

	<-ctx.Done()
	pgDB.Close()
	logger.GetLoggerFromCtx(ctx).Info(ctx, "Server Stopped")
}
