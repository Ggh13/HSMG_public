package traininghandler

import (
	"context"

	//"log"
	training_constructormodel "HSMGv2/internal/training_constructor/model"
	"HSMGv2/pkg/logger"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	GetFull(ctx context.Context, id_training_program int) (training_constructormodel.Training, error)
	GetGeneral(ctx context.Context, id_training_program int) (training_constructormodel.Training, error)
	Add(ctx context.Context, training_program training_constructormodel.Training) (bool, error)
	Update(ctx context.Context, training_program training_constructormodel.Training) (bool, error)
}

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) AddTrainingProgram(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var traingProgram training_constructormodel.Training
		if err := ctx.ShouldBindJSON(&traingProgram); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		_, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		flag, err := h.service.Add(contx, traingProgram)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add training", zap.Error(err))
			ctx.JSON(500, "Failed add training")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add training(alredy exists maybe)")
			ctx.JSON(400, "Failed add training")
			return
		}

		ctx.JSON(201, "Successfully added training")
	}
}

func (h *Handler) GetTrainingProgram(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id_training_program"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Cant read param", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		training, err := h.service.GetFull(contx, id)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get training", zap.Error(err))
			ctx.JSON(500, "Failed get training")
			return
		}

		ctx.JSON(200, training)
	}
}

func (h *Handler) UpdateTrainingProgram(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var traingProgram training_constructormodel.Training
		if err := ctx.ShouldBindJSON(&traingProgram); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		id_user, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		if traingProgram.Author.ID != id_user {
			ctx.JSON(400, gin.H{"message": "User not author"})
			logger.GetLoggerFromCtx(contx).Info(contx, "User not author")
			return
		}

		flag, err := h.service.Update(contx, traingProgram)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update training program", zap.Error(err))
			ctx.JSON(500, "Failed update training program")
			return
		}

		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update training program(alredy exists maybe)")
			ctx.JSON(400, "Failed  update training program")
			return
		}

		ctx.JSON(200, "Success  update training program")
	}
}
