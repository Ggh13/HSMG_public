package trainingfavouritehandler

import (
	trainingfavouritemodel "HSMGv2/internal/training_favourite/model"
	"HSMGv2/pkg/logger"
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	Get(ctx context.Context, user_id int) (trainingfavouritemodel.FavouritesTrainings, error)
	Remove(ctx context.Context, training_id int, user_id int) error
	Add(ctx context.Context, training_id int, user_id int) error
}

type Handler struct {
	service Service
}

func NewHandler(ctx context.Context, service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) AddToFavourite(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			return
		}

		trainingID, err := strconv.Atoi(ctx.Param("id_program"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed param id_program", zap.Error(err))
			ctx.JSON(400, "failed param id_program")
			return
		}

		err = h.service.Add(ctx, trainingID, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add to favourite", zap.Error(err))
			ctx.JSON(500, "failed add to favourite")
			return
		}

		ctx.JSON(200, "Success")
	}
}

func (h *Handler) DeleteFromFavourite(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			return
		}

		trainingID, err := strconv.Atoi(ctx.Param("id_program"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed param id_program", zap.Error(err))
			ctx.JSON(400, "failed param id_program")
			return
		}

		err = h.service.Remove(ctx, trainingID, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed remove from favourite", zap.Error(err))
			ctx.JSON(500, "failed add to favourite")
			return
		}

		ctx.JSON(200, "Success")
	}
}

func (h *Handler) GetFavourite(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			return
		}

		trainings, err := h.service.Get(ctx, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get favourite", zap.Error(err))
			ctx.JSON(500, "failed get favourite")
			return
		}

		ctx.JSON(200, trainings.Favourite.TrainingPrograms)
	}
}
