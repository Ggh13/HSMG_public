package authtransport

import (
	authhandler "HSMGv2/internal/auth/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, auH *authhandler.Handler, ctx context.Context) {
	r.POST("/api/register", auH.Register(ctx))
	r.POST("/api/login", auH.Login(ctx))
}
