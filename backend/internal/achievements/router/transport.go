package achievements_transport

import (
	achievements_handler "HSMGv2/internal/achievements/handler"
	authhandler "HSMGv2/internal/auth/handler"
	"context"

	"github.com/gin-gonic/gin"
)

func Transport(ctx context.Context, r *gin.Engine, h achievements_handler.Handler) {
	r.GET("/api/achievements/best_aproaches", authhandler.UserIdentity(ctx), h.BestAproaches(ctx))
	r.POST("/api/achievement/create", authhandler.UserIdentity(ctx), h.CreateAchievement(ctx))
	r.GET("/api/achievement/get", authhandler.UserIdentity(ctx), h.GetAchievementsAuth(ctx))
	r.GET("/api/achievement/get/:id_user", h.GetAchievements(ctx))
	r.DELETE("/api/achievement/delete/:id_achievement", authhandler.UserIdentity(ctx), h.DeleteAchievements(ctx))
}
