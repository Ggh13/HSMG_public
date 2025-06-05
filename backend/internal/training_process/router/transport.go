package training_processhandler

import (
	authhandler "HSMGv2/internal/auth/handler"
	training_processhandler "HSMGv2/internal/training_process/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, tcH *training_processhandler.Handler, ctx context.Context) {
	r.POST("/api/training_process/add/:training_program_id", authhandler.UserIdentity(ctx), tcH.AddTrainingProgramToUser(ctx))

	r.GET("/api/training_process/get/:training_program_id", authhandler.UserIdentity(ctx), tcH.GetTrainingProgramToUser(ctx))

	r.POST("/api/training_process/update/:training_program_id", authhandler.UserIdentity(ctx), tcH.UpdateUserTrainingProgram(ctx))

	r.POST("/api/training_process/done_exercise", authhandler.UserIdentity(ctx), tcH.UserDoneExercise(ctx))

	r.GET("/api/training_process/get", authhandler.UserIdentity(ctx), tcH.GetUsersPrograms(ctx))
}
