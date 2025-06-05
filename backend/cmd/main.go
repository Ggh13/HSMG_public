package main

import (
	achievements_handler "HSMGv2/internal/achievements/handler"
	achievements_repository "HSMGv2/internal/achievements/repository"
	achievements_transport "HSMGv2/internal/achievements/router"
	achievements_service "HSMGv2/internal/achievements/service"
	"HSMGv2/internal/anthropometry"
	authhandler "HSMGv2/internal/auth/handler"
	authrepository "HSMGv2/internal/auth/repository"
	authtransport "HSMGv2/internal/auth/router"
	authservice "HSMGv2/internal/auth/service"

	"HSMGv2/internal/config"
	fried_subscr_handler "HSMGv2/internal/friend_subscr/handler"
	fried_subscr_repository "HSMGv2/internal/friend_subscr/repository"
	fried_subscr_transport "HSMGv2/internal/friend_subscr/router"
	fried_subscr_service "HSMGv2/internal/friend_subscr/service"
	searching_training_handler "HSMGv2/internal/training_searching/handler"
	searching_training_repository "HSMGv2/internal/training_searching/repository"
	searching_training_transport "HSMGv2/internal/training_searching/router"
	searching_training_service "HSMGv2/internal/training_searching/service"
	users_searching_handler "HSMGv2/internal/users_searching/handler"
	users_searching_repository "HSMGv2/internal/users_searching/repository"
	users_searching_transport "HSMGv2/internal/users_searching/router"
	users_searching_service "HSMGv2/internal/users_searching/service"

	trainingstatistichandler "HSMGv2/internal/training_statistic/handler"
	trainingstatisticrepository "HSMGv2/internal/training_statistic/repository"
	trainingstatistictransport "HSMGv2/internal/training_statistic/router"
	trainingstatisticservice "HSMGv2/internal/training_statistic/service"

	trainingfavouritehandler "HSMGv2/internal/training_favourite/handler"
	trainingfavouriterepository "HSMGv2/internal/training_favourite/repository"
	trainingfavouritetransport "HSMGv2/internal/training_favourite/router"
	trainingfavouriteservice "HSMGv2/internal/training_favourite/service"

	server "HSMGv2/internal/transport/rest"
	userhandler "HSMGv2/internal/user/handler"
	userrepository "HSMGv2/internal/user/repository"
	usertransport "HSMGv2/internal/user/router"
	userservice "HSMGv2/internal/user/service"

	trainingconstructorhandler "HSMGv2/internal/training_constructor/handler"
	trainingconstructorrepository "HSMGv2/internal/training_constructor/repository"
	trainingconstructortransport "HSMGv2/internal/training_constructor/router"
	trainingconstructorservice "HSMGv2/internal/training_constructor/service"

	training_processhandler "HSMGv2/internal/training_process/handler"
	training_processrepository "HSMGv2/internal/training_process/repository"
	training_processtransport "HSMGv2/internal/training_process/router"
	training_processservice "HSMGv2/internal/training_process/service"

	librarieshandler "HSMGv2/internal/libraries/handler"
	librariesrepository "HSMGv2/internal/libraries/repository"
	librariestransport "HSMGv2/internal/libraries/router"
	librariesservice "HSMGv2/internal/libraries/service"

	historyhandler "HSMGv2/internal/history/handler"
	historyrepository "HSMGv2/internal/history/repository"
	historytransport "HSMGv2/internal/history/router"
	historyservice "HSMGv2/internal/history/service"

	statistichandler "HSMGv2/internal/statistic/handler"
	statisticrepository "HSMGv2/internal/statistic/repository"
	statistictransport "HSMGv2/internal/statistic/router"
	statisticservice "HSMGv2/internal/statistic/service"

	afc_handler "HSMGv2/internal/auth_for_camera/handler"
	afc_model "HSMGv2/internal/auth_for_camera/model"
	afc_repository "HSMGv2/internal/auth_for_camera/repository"
	afc_transport "HSMGv2/internal/auth_for_camera/router"
	afc_service "HSMGv2/internal/auth_for_camera/service"
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

	//_, err = redis.New(ctx, config.RedisCFG)
	//if err != nil {
	//	logger.GetLoggerFromCtx(ctx).Fatal(ctx, "Failed ping or connect redisDB", zap.Error(err))
	//}

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

	// Update/Get Training stat
	trainingStatRepo := trainingstatisticrepository.NewRepository(ctx, pgDB, mongoDB)
	trainingStatServ := trainingstatisticservice.NewService(ctx, trainingStatRepo)
	trainingStatHandl := trainingstatistichandler.NewHandler(ctx, trainingStatServ)
	trainingstatistictransport.Transport(r.RestServe, trainingStatHandl, ctx)

	// Training Favourite ПРОВЕРКА
	trFavRepo := trainingfavouriterepository.NewRepository(ctx, pgDB, mongoDB)
	trFavServ := trainingfavouriteservice.NewService(ctx, trFavRepo, *trainingStatRepo)
	trFavHandl := trainingfavouritehandler.NewHandler(ctx, trFavServ)
	trainingfavouritetransport.Transport(r.RestServe, ctx, *trFavHandl)

	//Training programs
	trainingconstructorRepo := trainingconstructorrepository.NewRepository(ctx, pgDB, mongoDB)
	trainingconstructorServ := trainingconstructorservice.NewService(ctx, trainingconstructorRepo, *trainingStatRepo)
	trainingconstructorHandl := trainingconstructorhandler.NewHandler(trainingconstructorServ)
	trainingconstructortransport.Transport(r.RestServe, trainingconstructorHandl, ctx)

	//Training process
	training_processRepository := training_processrepository.NewRepository(ctx, pgDB, mongoDB)
	training_processService := training_processservice.NewService(ctx, training_processRepository, *trainingconstructorRepo)
	trainingprocessHandler := training_processhandler.NewHandler(training_processService)
	training_processtransport.Transport(r.RestServe, trainingprocessHandler, ctx)

	// Searching training
	searchTrainingRepo := searching_training_repository.New(pgDB, mongoDB)
	searchTrainingServ := searching_training_service.New(searchTrainingRepo, *trainingStatRepo)
	searchTrainingHand := searching_training_handler.New(searchTrainingServ)
	searching_training_transport.Transport(r.RestServe, ctx, *searchTrainingHand)

	// Libraries
	librariesRepo := librariesrepository.NewRepository(ctx, pgDB, mongoDB)
	librariesServ := librariesservice.NewService(ctx, librariesRepo)
	librariesHand := librarieshandler.NewHandler(librariesServ)
	librariestransport.Transport(r.RestServe, librariesHand, ctx)

	// Achievements
	achRepo := achievements_repository.New(pgDB, mongoDB)
	achServ := achievements_service.New(&achRepo, *librariesServ)
	achHandl := achievements_handler.New(ctx, &achServ)
	achievements_transport.Transport(ctx, r.RestServe, achHandl)

	// History Exercise
	historyRepo := historyrepository.NewRepository(ctx, pgDB, mongoDB)
	historyServ := historyservice.NewService(ctx, historyRepo)
	historyHand := historyhandler.NewHandler(historyServ)
	historytransport.Transport(r.RestServe, historyHand, ctx)

	// Searching users
	searchUsersRepo := users_searching_repository.NewRepository(pgDB, mongoDB)
	searchUsersServ := users_searching_service.NewService(ctx, searchUsersRepo)
	searchUsersHand := users_searching_handler.New(searchUsersServ)
	users_searching_transport.Transport(r.RestServe, searchUsersHand, ctx)

	// Comunity(friends)
	comRepo := fried_subscr_repository.NewRepository(pgDB, mongoDB)
	comServ := fried_subscr_service.NewService(ctx, comRepo)
	comHandl := fried_subscr_handler.New(comServ)
	fried_subscr_transport.Transport(r.RestServe, *comHandl, ctx)

	// Anthropometry
	anthropometry.Init(ctx, r, pgDB, mongoDB)
	//antRepo := anthropometryrepository.NewRepository(pgDB, mongoDB)
	//antServ := anthropometryservice.NewService(ctx, antRepo)
	//antHandl := anthropometryhandler.NewHandler(ctx, antServ)
	//anthropometryrouter.Transport(r.RestServe, *antHandl, ctx)

	statisticRepo := statisticrepository.NewRepository(ctx, pgDB, mongoDB)
	statisticServ := statisticservice.NewService(ctx, statisticRepo)
	statisticHand := statistichandler.NewHandler(ctx, statisticServ)
	statistictransport.Transport(r.RestServe, ctx, statisticHand)
	/*
		ctx, cancel := signal.NotifyContext(
			context.Background(),
			os.Interrupt,
			syscall.SIGTERM,
		)
		defer cancel()
	*/
	updates := make(chan afc_model.UpdateMessage)
	defer close(updates)

	afc_rep := afc_repository.NewRepository(ctx, pgDB, mongoDB)

	go afc_rep.ListenToPgNotifications(ctx, updates)

	afc_ser := afc_service.NewService(ctx, afc_rep, updates)
	afc_rhand := afc_handler.NewHandler(ctx, afc_ser)
	afc_transport.Transport(r.RestServe, ctx, afc_rhand)

	r.Run(ctx)

	<-ctx.Done()
	pgDB.Close()
	logger.GetLoggerFromCtx(ctx).Info(ctx, "Server Stopped")
}
