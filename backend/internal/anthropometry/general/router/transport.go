package anthropometryrouter

import (
	anthropometryhandler "HSMGv2/internal/anthropometry/general/handler"
	authhandler "HSMGv2/internal/auth/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(r *gin.Engine, H anthropometryhandler.Handler, ctx context.Context) {
	r.PUT("/api/anthropometry/set", authhandler.UserIdentity(ctx), H.SetAnthropometry(ctx))
	r.DELETE("/api/anthropometry/delete", authhandler.UserIdentity(ctx), H.DeleteAnthropometry(ctx))
	r.GET("/api/anthropometry/:user_id", H.GetAnthropometry(ctx))
}
