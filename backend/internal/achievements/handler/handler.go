package achievements_handler

import (
	achievements_model "HSMGv2/internal/achievements/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetBestAproaches(ctx context.Context, userID int, isAuth bool,
	) (achievements_model.BestApproaches, error)
	Get(ctx context.Context, userID int, isAuth bool,
	) (achievements_model.Achievements, error)
	Create(ctx context.Context, userID int, apr achievements_model.Achievement,
	) error
	Delete(ctx context.Context, userID int, achievementID int) error
}

type Handler struct {
	service Service
}

func New(ctx context.Context, s Service) Handler {
	return Handler{service: s}
}

func (h *Handler) BestAproaches(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		apr, err := h.service.GetBestAproaches(ctx, userID.(int), true)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed Get Best aproaches", zap.Error(err))
			ctx.JSON(500, "Failed to get best aproaches")
			return
		}

		ctx.JSON(200, apr)
	}
}

func (h *Handler) CreateAchievement(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		var achievement achievements_model.Achievement
		if err := ctx.ShouldBindJSON(&achievement); err != nil {
			ctx.JSON(400, gin.H{"message": "Failed create new uachievement"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed unmarshal achievement data", zap.Error(err))
			return
		}

		err := h.service.Create(ctx, userID.(int), achievement)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed create achievement", zap.Error(err))
			ctx.JSON(500, "failed create achievement")
			return
		}

		ctx.JSON(200, "Success")
	}
}

func (h *Handler) GetAchievementsAuth(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		achievements, err := h.service.Get(ctx, userID.(int), true)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get auth achievements", zap.Error(err))
			ctx.JSON(500, "failed get auth achievements")
			return
		}

		ctx.JSON(200, achievements)
	}
}

func (h *Handler) GetAchievements(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, err := strconv.Atoi(ctx.Param("id_user"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			return
		}

		achievements, err := h.service.Get(ctx, userID, true)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get achievements", zap.Error(err))
			ctx.JSON(500, "failed get achievements")
			return
		}

		ctx.JSON(200, achievements)
	}
}

func (h *Handler) DeleteAchievements(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		achievementID, err := strconv.Atoi(ctx.Param("id_achievement"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			return
		}

		err = h.service.Delete(contx, userID.(int), achievementID)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed delete achievements", zap.Error(err))
			ctx.JSON(500, "Failed delete achievement")
			return
		}

		ctx.JSON(200, "Success")
	}
}
