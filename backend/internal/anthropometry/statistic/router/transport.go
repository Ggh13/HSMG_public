package anthropometry_stat_router

import (
	anthropometry_stat_handler "HSMGv2/internal/anthropometry/statistic/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, H anthropometry_stat_handler.Handler, ctx context.Context) {
	r.POST("/api/anthropometry/statistic/:user_id", H.GetAnthrStat(ctx))
}
