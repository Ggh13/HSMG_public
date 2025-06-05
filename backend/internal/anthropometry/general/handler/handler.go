package anthropometryhandler

import (
	anthropometrymodel "HSMGv2/internal/anthropometry/general/model"
	anthropometryservice "HSMGv2/internal/anthropometry/general/service"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"go.uber.org/zap"
)

type Service interface {
	SetAnthropometry(ctx context.Context, anthr anthropometrymodel.Anthropometry, userID int) error
	DeleteAnthropometry(ctx context.Context, userID int) error
	GetAnthropometry(ctx context.Context, userID int) (anthropometrymodel.Anthropometry, error)
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) SetAnthropometry(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised")
			ctx.JSON(401, "Unauthorised")
			return
		}

		var anth anthropometrymodel.Anthropometry
		if err := ctx.ShouldBindJSON(&anth); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Bad anthropometry request", zap.Error(err))
			ctx.JSON(400, "Bad request not on anthropometry")
			return
		}

		err := h.service.SetAnthropometry(ctx, anth, userID.(int))
		if err == anthropometryservice.ErrAlreadyExists {
			ctx.JSON(203, "Non-Authoritative Information")
			return
		}
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed to put anthropometry", zap.Error(err))
			ctx.JSON(500, "Failed to add  anthropometry")
			return
		}

		ctx.JSON(200, "Successfulla added anthropometry")
	}
}

func (h *Handler) DeleteAnthropometry(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised")
			ctx.JSON(401, "Unauthorised")
			return
		}

		err := h.service.DeleteAnthropometry(ctx, userID.(int))
		if err == anthropometryservice.ErrATimeIsUp {
			ctx.JSON(203, "Non-Authoritative Information")
			return
		}
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed to delete anthropometry", zap.Error(err))
			ctx.JSON(500, "Failed to delete anthropometry")
			return
		}

		ctx.JSON(200, "Successfulla deleted anthropometry")
	}
}

func (h *Handler) GetAnthropometry(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, err := strconv.Atoi(ctx.Param("user_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			ctx.JSON(400, "Failed get user_id")
			return
		}

		anthr, err := h.service.GetAnthropometry(ctx, userID)
		if err == pgx.ErrNoRows {
			ctx.JSON(204, "No anthropometry yet")
			return
		}
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get anthropometry", zap.Error(err))
			ctx.JSON(500, "failed get anthropometry")
			return
		}

		ctx.JSON(200, anthr)
	}
}
