package users_searching_handler

import (
	users_searching_models "HSMGv2/internal/users_searching/models"
	"HSMGv2/pkg/logger"
	"context"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	Get(ctx context.Context, userID int, filter users_searching_models.UserFilter) (users_searching_models.Users, error)
}

type Handler struct {
	serv Service
}

func New(s Service) *Handler {
	return &Handler{serv: s}
}

func (h *Handler) Search(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var filter users_searching_models.UserFilter
		if err := ctx.ShouldBindJSON(&filter); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad filter request")
			return
		}

		userID, exists := ctx.Get("userID")
		if !exists {
			userID = -1
		}

		users, err := h.serv.Get(ctx, userID.(int), filter)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed to search users", zap.Error(err))
			ctx.JSON(500, "Failed to search users")
			return
		}

		ctx.JSON(200, users)
	}
}
