package fried_subscr_handler

import (
	fried_subscr_model "HSMGv2/internal/friend_subscr/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	AddFriend(ctx context.Context, userID int, friendID int) error
	DeleteFriend(ctx context.Context, userID int, friendID int) error
	GetFriends(ctx context.Context, userID int) (fried_subscr_model.Users, error)
}

type Handler struct {
	serv Service
}

func New(s Service) *Handler {
	return &Handler{serv: s}
}

func (h *Handler) AddFriend(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised")
			ctx.JSON(401, "Unauthorised")
			return
		}

		friendID, err := strconv.Atoi(ctx.Param("user_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			ctx.JSON(400, "Failed get user_id")
			return
		}

		err = h.serv.AddFriend(contx, userID.(int), friendID)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add friend", zap.Error(err))
			ctx.JSON(500, "Failed add friend(already friend maybe)")
			return
		}

		ctx.JSON(200, "Good friendship")
	}
}

func (h *Handler) DeleteFriend(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised")
			ctx.JSON(401, "Unauthorised")
			return
		}

		friendID, err := strconv.Atoi(ctx.Param("user_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user_id: %w", zap.Error(err))
			ctx.JSON(400, "Failed get user_id")
			return
		}

		err = h.serv.DeleteFriend(contx, userID.(int), friendID)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed delete friend", zap.Error(err))
			ctx.JSON(500, "Failed delete friend")
			return
		}

		ctx.JSON(200, "That was bad friendship")
	}
}

func (h *Handler) GetFriends(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised")
			ctx.JSON(401, "Unauthorised")
			return
		}

		users, err := h.serv.GetFriends(contx, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get friends", zap.Error(err))
			ctx.JSON(500, "Failed get friends")
			return
		}

		ctx.JSON(200, users)
	}
}
