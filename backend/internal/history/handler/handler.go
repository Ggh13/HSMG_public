package librarieshandler

import (
	"context"
	"strconv"

	//"log"
	history_model "HSMGv2/internal/history/model"
	//training_constructormodel "HSMGv2/internal/training_constructor/model"

	"HSMGv2/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetExerciseHistory(ctx context.Context, userID int) (bool, []history_model.ExerciseWithDate, error)
	//GetAll(ctx context.Context) (bool, librariesmodel.Exercises, error)
}

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) GetExerciseHistory(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		user_id, err := strconv.Atoi(ctx.Param("user_id"))

		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get training id", zap.Error(err))
			ctx.JSON(500, "Failed get training id")
			return
		}

		flag, training_exercise, err := h.service.GetExerciseHistory(contx, user_id)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get exercise ", zap.Error(err))
			ctx.JSON(500, "Failed get exercise")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user ", zap.Error(err))
			ctx.JSON(400, "Failed get exercise")
			return
		}

		ctx.JSON(200, training_exercise)
	}
}
