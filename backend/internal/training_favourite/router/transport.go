package trainingfavouritetransport

import (
	authhandler "HSMGv2/internal/auth/handler"
	trainingfavouritehandler "HSMGv2/internal/training_favourite/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, ctx context.Context, stH trainingfavouritehandler.Handler) {
	r.PUT("/api/training_favourite/add/:id_program", authhandler.UserIdentity(ctx), stH.AddToFavourite(ctx))
	r.DELETE("/api/training_favourite/delete/:id_program", authhandler.UserIdentity(ctx), stH.DeleteFromFavourite(ctx))
	r.GET("/api/training_favourite/get", authhandler.UserIdentity(ctx), stH.GetFavourite(ctx))
}
