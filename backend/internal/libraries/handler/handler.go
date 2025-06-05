package librarieshandler

import (
	"context"
	"strconv"

	//"log"

	librariesmodel "HSMGv2/internal/libraries/model"
	"HSMGv2/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetOne(ctx context.Context, training_exercise_id int) (bool, librariesmodel.Exercise, error)
	GetAll(ctx context.Context) (bool, librariesmodel.Exercises, error)
}

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) GetOneTrainingExercise(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		program_id, err := strconv.Atoi(ctx.Param("training_exercise_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get exercise id", zap.Error(err))
			ctx.JSON(500, "Failed get exercise id")
			return
		}

		flag, training_exercise, err := h.service.GetOne(contx, program_id)
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

func (h *Handler) GetAllTrainingExercises(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		flag, training_exercises, err := h.service.GetAll(contx)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get exercises ", zap.Error(err))
			ctx.JSON(500, "Failed get exercises")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get exercises ", zap.Error(err))
			ctx.JSON(400, "Failed get exercises")
			return
		}

		ctx.JSON(200, training_exercises)
	}
}
