package anthropometry_stat_handler

import (
	anthropometry_stat_model "HSMGv2/internal/anthropometry/statistic/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetStat(ctx context.Context, userID int, filter anthropometry_stat_model.Filter,
	) (anthropometry_stat_model.AnthropometryStat, error)
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAnthrStat(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, err := strconv.Atoi(ctx.Param("user_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed param user_id", zap.Error(err))
			ctx.JSON(400, "Failed get user_id")
			return
		}

		var filter anthropometry_stat_model.Filter
		if err := ctx.ShouldBindJSON(&filter); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed unmarshal json", zap.Error(err))
			ctx.JSON(400, "Failed get filter parametrs")
			return
		}

		stat, err := h.service.GetStat(contx, userID, filter)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed get anthropometry stat", zap.Error(err))
			ctx.JSON(500, "Failed get anthropometry statistic")
			return
		}

		ctx.JSON(200, stat)
	}
}
