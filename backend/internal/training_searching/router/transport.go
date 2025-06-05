package searching_training_transport

import (
	searching_training_handler "HSMGv2/internal/training_searching/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, ctx context.Context, stH searching_training_handler.Handler) {
	r.POST("/api/searching_training/find", stH.FindTraining(ctx))
	r.GET("/api/searching_training/get/:training_id", stH.GeneralInfo(ctx))
}
