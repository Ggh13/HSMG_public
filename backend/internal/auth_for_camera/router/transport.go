package afc_transport

import (
	authhandler "HSMGv2/internal/auth/handler"
	afc_handler "HSMGv2/internal/auth_for_camera/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, ctx context.Context, afcS *afc_handler.Handler) {

	r.GET("/api/auth_camera/new_qr", afcS.SetQrId(ctx))

	r.POST("/api/auth_user_to_camera/new_qr/:qr_code_id", authhandler.UserIdentity(ctx), afcS.AuthCamForUser(ctx))

	r.GET("/api/auth_user_to_camera/get_camera_status/:qr_code_id", afcS.GetCameraStatus(ctx))

	//r.GET("/api/auth_user_to_camera/get_user_token/:user_id", afcS.GetUserIdToken(ctx))

	r.GET("/api/auth_user_to_camera/get_user_token/:user_id", afcS.GetUserIdToken(ctx))

}
