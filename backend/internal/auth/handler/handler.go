package authhandler

import (
	authmodel "HSMGv2/internal/auth/model"
	"HSMGv2/pkg/logger"
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	Authorisation(ctx context.Context, user authmodel.UserAuth) (bool, string, error)
	Registration(ctx context.Context, user authmodel.UserRegister) (bool, error)
}

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) Register(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user authmodel.UserRegister

		if err := ctx.ShouldBindJSON(&user); err != nil {
			log.Printf("Failed bind json(register): %s", err)
			ctx.JSON(400, "Bad request")
			return
		}

		flag, err := h.service.Registration(contx, user)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed register", zap.Error(err))
			ctx.JSON(500, "Failed register")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed register(alredy exists maybe)")
			ctx.JSON(400, "Failed register")
			return
		}

		ctx.JSON(201, "Success registration")
	}
}

func (h *Handler) Login(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user authmodel.UserAuth
		if err := ctx.ShouldBindJSON(&user); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		flag, token, err := h.service.Authorisation(contx, user)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed authorise", zap.Error(err))
			ctx.JSON(500, "Failed authoise")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "wrong pass or jwt gen", zap.Error(err))
			ctx.JSON(400, "Failed authorise(wrong password)")
			return
		}

		ctx.JSON(200, gin.H{"message": "Success", "token": token})
	}
}
