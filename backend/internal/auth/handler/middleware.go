package authhandler

import (
	authutils "HSMGv2/internal/auth/utils"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

type key string

const (
	userID = key("userID")
)

func UserIdentity(ctx *gin.Context) {
	header := ctx.GetHeader("Authorization")
	if header == "" {
		ctx.JSON(400, "No Header!")
		log.Println("no header")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		log.Println("Heder not two parted")
		ctx.JSON(400, gin.H{"message": "header not two parted"})
		return
	}

	claims, err := authutils.ValidateJWT(headerParts[1])
	if err != nil {
		log.Print(err.Error())
		ctx.JSON(500, err.Error())
	}

	ctx.Set(string(userID), claims.UserID)

	ctx.Next()
}
