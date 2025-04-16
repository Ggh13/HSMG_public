package usertransport

import (
	authhandler "HSMGv2/internal/auth/handler"
	userhandler "HSMGv2/internal/user/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, userH *userhandler.Handler, ctx context.Context) {
	r.GET("/api/get_authorized_user_data", authhandler.UserIdentity, userH.GetAuthUser(ctx))
	r.GET("/api/user_data/:id_user", userH.GetData(ctx))
	r.POST("/api/update_user_data", authhandler.UserIdentity, userH.UpdateData(ctx))
	r.POST("/api/update_social_media", authhandler.UserIdentity, userH.UpdateSocialMedia(ctx))
}
