package searching_training_handler

import (
	searching_training_model "HSMGv2/internal/training_searching/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	Find(ctx context.Context, filter searching_training_model.TrainingFilter,
	) (searching_training_model.TrainingPrograms, error)
	Get(ctx context.Context, trainingID int,
	) (searching_training_model.GeneralTrainingInfo, error)
}

type Handler struct {
	service Service
}

func New(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) FindTraining(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var filter searching_training_model.TrainingFilter
		if err := ctx.ShouldBindJSON(&filter); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed find training", zap.Error(err))
			ctx.JSON(400, "Failed get filter")
			return
		}

		trainings, err := h.service.Find(contx, filter)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed search trainings:", zap.Error(err))
			ctx.JSON(500, "Failedto search")
			return
		}

		ctx.JSON(200, trainings)
	}
}

func (h *Handler) GeneralInfo(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		trainingID, err := strconv.Atoi(ctx.Param("training_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed param training_id", zap.Error(err))
			ctx.JSON(400, "Bad Request")
			return
		}

		training, err := h.service.Get(contx, trainingID)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed Get general info training:", zap.Error(err))
			ctx.JSON(500, "Failed get general info training")
			return
		}

		ctx.JSON(200, training)
	}
}
