package userhandler

import (
	usermodel "HSMGv2/internal/user/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetUser(ctx context.Context, user_id int) (usermodel.User, error)
	UpdateUser(ctx context.Context, user usermodel.User) error
	UpdateSocialMedia(ctx context.Context, user_id int, socialMedia usermodel.SocialMedia) error
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAuthUser(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")

		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		user, err := h.service.GetUser(contx, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed Get user's data", zap.Error(err))
			ctx.JSON(500, "Failed get user's data")
			return
		}

		ctx.JSON(200, user)
	}
}

func (h *Handler) GetData(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		user_id, err := strconv.Atoi(ctx.Param("id_user"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			return
		}

		user, err := h.service.GetUser(contx, user_id)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed Get user's data", zap.Error(err))
			ctx.JSON(500, "Failed get user's data")
			return
		}

		ctx.JSON(200, user)
	}
}

func (h *Handler) UpdateData(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")

		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		var user usermodel.User
		if err := ctx.ShouldBindJSON(&user); err != nil {
			ctx.JSON(300, gin.H{"message": "Failed get new user fields"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed unmarshal user's data", zap.Error(err))
			return
		}
		user.ID = userID.(int)
		err := h.service.UpdateUser(contx, user)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update user's data", zap.Error(err))
			ctx.JSON(500, "Failed update data")
			return
		}

		ctx.JSON(200, "Successfuly updated")
	}
}

func (h *Handler) UpdateSocialMedia(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")

		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		var socialMedia usermodel.SocialMedia
		if err := ctx.ShouldBindJSON(&socialMedia); err != nil {
			ctx.JSON(300, gin.H{"message": "Failed get new user fields"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed unmarshal user's socialMedia", zap.Error(err))
			return
		}

		err := h.service.UpdateSocialMedia(contx, userID.(int), socialMedia)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update user's socialMedia", zap.Error(err))
			ctx.JSON(500, "Failed update socialMedia")
			return
		}

		ctx.JSON(200, "Succesfully updated Social Media")
	}
}
