package traininghandler

import (
	authhandler "HSMGv2/internal/auth/handler"
	training_constructorhandler "HSMGv2/internal/training_constructor/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, tcH *training_constructorhandler.Handler, ctx context.Context) {
	r.GET("/api/training_program/get/:id_training_program", tcH.GetTrainingProgram(ctx))
	r.POST("/api/training_program/add", authhandler.UserIdentity, tcH.AddTrainingProgram(ctx))
	r.POST("/api/training_program/update", authhandler.UserIdentity, tcH.UpdateTrainingProgram(ctx))
}
