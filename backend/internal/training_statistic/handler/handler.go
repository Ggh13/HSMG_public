package trainingstatistichandler

import (
	trainingstatisticmodel "HSMGv2/internal/training_statistic/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetStat(ctx context.Context, training_id int) (trainingstatisticmodel.StatisticTraining, error)
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetTrainigStatistic(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		training_id, err := strconv.Atoi(ctx.Param("training_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "FailedParam(training_id): %w", zap.Error(err))
			ctx.JSON(400, "training_id not found or not correct format")
			return
		}
		stat, err := h.service.GetStat(contx, training_id)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get Training statistic: %w", zap.Error(err))
			ctx.JSON(500, "failed get statistic")
			return
		}

		ctx.JSON(200, stat)
	}
}
