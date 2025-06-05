package trainingstatistictransport

import (
	trainingstatistichandler "HSMGv2/internal/training_statistic/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, h *trainingstatistichandler.Handler, ctx context.Context) {
	r.GET("/api/training_statistic/:training_id", h.GetTrainigStatistic(ctx))
}
