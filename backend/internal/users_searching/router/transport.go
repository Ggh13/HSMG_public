package users_searching_transport

import (
	authhandler "HSMGv2/internal/auth/handler"
	users_searching_handler "HSMGv2/internal/users_searching/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, searchH *users_searching_handler.Handler, ctx context.Context) {
	r.POST("/api/find_people", searchH.Search(ctx))
	r.POST("/api/auth/find_people", authhandler.UserIdentity(ctx), searchH.Search(ctx))
}
