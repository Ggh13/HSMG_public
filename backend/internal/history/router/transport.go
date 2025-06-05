package historytransport

import (
	historyhandler "HSMGv2/internal/history/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, hisH *historyhandler.Handler, ctx context.Context) {
	r.GET("/api/history/get_exercise_history/:user_id", hisH.GetExerciseHistory(ctx))

}
