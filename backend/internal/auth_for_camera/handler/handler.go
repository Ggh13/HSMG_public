package afc_handler

import (
	"HSMGv2/pkg/logger"
	"context"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"go.uber.org/zap"
)

type Service interface {
	SetQrId(ctx context.Context) (string, error)
	AuthUserForCam(ctx context.Context, user_id int, qr_code_id string) (bool, error)
	//GetCameraStatus(ctx context.Context, qr_code_id string) (string, error)
	GetCameraStatus(ctx context.Context, qr_code string, c *gin.Context) (string, error)

	GetUserIdToken(ctx context.Context, user_id int) (string, error)
	//Remove(ctx context.Context, training_id int, user_id int) error
	//Add(ctx context.Context, training_id int, user_id int) error
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) SetQrId(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		statistic, err := h.service.SetQrId(ctx)
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

func (h *Handler) AuthCamForUser(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		qr_code_id := ctx.Param("qr_code_id")

		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		statistic, err := h.service.AuthUserForCam(ctx, userID.(int), qr_code_id)
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

/*
	func (h *Handler) GetCameraStatus(contx context.Context) gin.HandlerFunc {
		return func(ctx *gin.Context) {
			qr_code_id := ctx.Param("qr_code_id")

			statistic, err := h.service.GetCameraStatus(ctx, qr_code_id)
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
*/
func (h *Handler) GetUserIdToken(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		user_id, err := strconv.Atoi(ctx.Param("user_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get statistic", zap.Error(err))
			ctx.JSON(500, "failed get statistic")
			return
		}

		statistic, err := h.service.GetUserIdToken(ctx, user_id)
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

func (h *Handler) GetCameraStatus(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		fmt.Println("Hello2")
		user_id := ctx.Param("qr_code_id")

		fmt.Println("Hello")
		statistic, err := h.service.GetCameraStatus(ctx, user_id, ctx)
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
