package progress_processhandler

import (
	"context"
	"fmt"
	"strconv"

	//"log"

	progress_exmodel "HSMGv2/internal/training_process/model"
	"HSMGv2/pkg/logger"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Service interface {
	Get(ctx context.Context, trainingID int, userID int) (bool, progress_exmodel.UsersTrainingProgram, error)
	Update(ctx context.Context, usersTraining progress_exmodel.UsersTrainingProgram, userID int) (bool, error)
	Add(ctx context.Context, trainingID int, userID int) (bool, error)
	DoneEx(ctx context.Context, userID int, exerciseID int, exerciseData progress_exmodel.UsersExercise) (bool, error)
	GetUsersPrograms(ctx context.Context, userID int) (progress_exmodel.UserTrainings, error)
}

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) GetTrainingProgramToUser(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id_user, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		program_id, err := strconv.Atoi(ctx.Param("training_program_id"))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get training id", zap.Error(err))
			ctx.JSON(500, "Failed get training id")
			return
		}

		flag, training_program, err := h.service.Get(contx, program_id, id_user.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user training", zap.Error(err))
			ctx.JSON(500, "Failed get user training")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get user ", zap.Error(err))
			ctx.JSON(400, "Failed get user training")
			return
		}

		ctx.JSON(200, training_program.Training)
	}
}

func (h *Handler) AddTrainingProgramToUser(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id_user, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		program_id, err := strconv.Atoi(ctx.Param("training_program_id"))

		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed get training id", zap.Error(err))
			ctx.JSON(500, "Failed get training id")
			return
		}

		flag, err := h.service.Add(contx, program_id, id_user.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add user training", zap.Error(err))
			ctx.JSON(500, "Failed add user training")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed add user training(alredy exists maybe)")
			ctx.JSON(400, "Failed add user training")
			return
		}

		ctx.JSON(201, "Successfully added user training")
	}
}

func (h *Handler) UpdateUserTrainingProgram(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var traingProgram progress_exmodel.UsersTrainingProgram
		if err := ctx.ShouldBindJSON(&traingProgram.Training); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}

		user_id, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		flag, err := h.service.Update(contx, traingProgram, user_id.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update user training", zap.Error(err))
			ctx.JSON(500, "Failed update user training")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed update user training")
			ctx.JSON(400, "Failed update user training")
			return
		}

		ctx.JSON(200, "Successfully update user training")
	}
}

func (h *Handler) UserDoneExercise(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var traingEx progress_exmodel.UsersExercise
		if err := ctx.ShouldBindJSON(&traingEx); err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "failed bind json", zap.Error(err))
			ctx.JSON(400, "Bad request")
			return
		}
		fmt.Println(traingEx)
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		flag, err := h.service.DoneEx(contx, userID.(int), traingEx.ExerciseID, traingEx)
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed done exercise training 1", zap.Error(err))
			ctx.JSON(500, "Failed update user training 1")
			return
		}
		if !flag {
			logger.GetLoggerFromCtx(contx).Info(contx, "Failed done exercise user training 2")
			ctx.JSON(400, "Failed done exercise user training 2")
			return
		}

		ctx.JSON(201, "Successfully done exercise user training")
	}
}

func (h *Handler) GetUsersPrograms(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID, exists := ctx.Get("userID")
		if !exists {
			ctx.JSON(400, gin.H{"message": "Not authorised"})
			logger.GetLoggerFromCtx(contx).Info(contx, "Not Authorised User")
			return
		}

		trainings, err := h.service.GetUsersPrograms(contx, userID.(int))
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(ctx, "Failed get users program to train", zap.Error((err)))
			ctx.JSON(500, "failed get users trainings to train")
			return
		}

		ctx.JSON(200, trainings.Trainings.UsersTrainings)
	}
}
