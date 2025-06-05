package anthropometry

import (
	anthropometryhandler "HSMGv2/internal/anthropometry/general/handler"
	anthropometryrepository "HSMGv2/internal/anthropometry/general/repository"
	anthropometryrouter "HSMGv2/internal/anthropometry/general/router"
	anthropometryservice "HSMGv2/internal/anthropometry/general/service"
	anthropometry_stat_handler "HSMGv2/internal/anthropometry/statistic/handler"
	anthropometry_stat_repository "HSMGv2/internal/anthropometry/statistic/repository"
	anthropometry_stat_router "HSMGv2/internal/anthropometry/statistic/router"
	anthropometry_stat_service "HSMGv2/internal/anthropometry/statistic/service"
	server "HSMGv2/internal/transport/rest"
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

func Init(ctx context.Context, r server.Router,
	pgDB *pgxpool.Pool, mongoDB *mongo.Database) {
	antRepo := anthropometryrepository.NewRepository(pgDB, mongoDB)
	antServ := anthropometryservice.NewService(ctx, antRepo)
	antHandl := anthropometryhandler.NewHandler(ctx, antServ)
	anthropometryrouter.Transport(r.RestServe, *antHandl, ctx)

	statRep0 := anthropometry_stat_repository.NewRepository(pgDB, mongoDB)
	statServ := anthropometry_stat_service.NewService(statRep0)
	statHandl := anthropometry_stat_handler.NewHandler(ctx, statServ)
	anthropometry_stat_router.Transport(r.RestServe, *statHandl, ctx)
}
