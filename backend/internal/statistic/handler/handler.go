package statistichandler

import (
	statisticmodel "HSMGv2/internal/statistic/model"
	"HSMGv2/pkg/logger"
	"context"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"go.uber.org/zap"
)

type Service interface {
	GetStatisticByTrainingExercises(ctx context.Context, user_id statisticmodel.StatisticExersiceRequest) (statisticmodel.StatisticByExersice, error)
	//Remove(ctx context.Context, training_id int, user_id int) error
	//Add(ctx context.Context, training_id int, user_id int) error
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetStatisticByTrainingExercises(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var statistic_by_training_exercises statisticmodel.StatisticExersiceRequest
		if err := ctx.ShouldBindJSON(&statistic_by_training_exercises); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		statistic, err := h.service.GetStatisticByTrainingExercises(ctx, statistic_by_training_exercises)
		if err == pgx.ErrNoRows {
			ctx.JSON(204, "No content")
			return
		}
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get statistic", zap.Error(err))
			ctx.JSON(500, "failed get statistic")
			return
		}

		ctx.JSON(200, statistic)
	}
}
