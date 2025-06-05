package fried_subscr_transport

import (
	authhandler "HSMGv2/internal/auth/handler"
	fried_subscr_handler "HSMGv2/internal/friend_subscr/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, fsH fried_subscr_handler.Handler, ctx context.Context) {
	r.PUT("/api/comunity/add/:user_id", authhandler.UserIdentity(ctx), fsH.AddFriend(ctx))
	r.DELETE("/api/comunity/delete/:user_id", authhandler.UserIdentity(ctx), fsH.DeleteFriend(ctx))
	r.GET("/api/comunity/get", authhandler.UserIdentity(ctx), fsH.GetFriends(ctx))
}
