package librariestransport

import (
	librarieshandler "HSMGv2/internal/libraries/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, libH *librarieshandler.Handler, ctx context.Context) {
	r.GET("/api/libraries/training_exercises/get/:training_exercise_id", libH.GetOneTrainingExercise(ctx))
	r.GET("/api/libraries/training_exercises/get_all", libH.GetAllTrainingExercises(ctx))
}
