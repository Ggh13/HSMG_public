package authhandler

import (
	authutils "HSMGv2/internal/auth/utils"
	"HSMGv2/pkg/logger"
	"context"
	"strings"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type key string

const (
	userID = key("userID")
)

func UserIdentity(contx context.Context) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		header := ctx.GetHeader("Authorization")
		if header == "" {
			logger.GetLoggerFromCtx(contx).Info(contx, "No header")
			ctx.AbortWithStatusJSON(400, "No Header!")
			return
		}

		headerParts := strings.Split(header, " ")
		if len(headerParts) != 2 {
			logger.GetLoggerFromCtx(contx).Info(contx, "Heder not two parted")
			ctx.AbortWithStatusJSON(400, gin.H{"message": "header not two parted"})
			return
		}

		claims, err := authutils.ValidateJWT(headerParts[1])
		if err != nil {
			logger.GetLoggerFromCtx(contx).Info(contx, "Heder not two parted", zap.Error(err))
			ctx.AbortWithStatusJSON(401, gin.H{
				"error":             "invalid_token",
				"error_description": "Invalid or expired JWT token",
			})
			return
		}

		ctx.Set(string(userID), claims.UserID)

		ctx.Next()
	}
}
