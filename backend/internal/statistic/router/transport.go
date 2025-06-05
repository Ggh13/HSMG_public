package statistictransport

import (
	//authhandler "HSMGv2/internal/auth/handler"
	statistichandler "HSMGv2/internal/statistic/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, ctx context.Context, stS *statistichandler.Handler) {
	r.POST("/api/statistic/get/exercises", stS.GetStatisticByTrainingExercises(ctx))
}
