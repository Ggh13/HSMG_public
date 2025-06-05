package afc_service

import (
	authhandler "HSMGv2/internal/auth/utils"
	model "HSMGv2/internal/auth_for_camera/model"
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/jackc/pgx"
	_ "github.com/lib/pq"
)

type Repository interface {
	SetQrId(ctx context.Context, qr_code_id string) (bool, error)
	SetUserToCam(ctx context.Context, user_id int, qr_code_id string) (bool, error)
	GetCameraStatus(ctx context.Context, qr_code_id string) (string, error)
	GetUserId(ctx context.Context, user_id int) (string, error)
}

type Service struct {
	repo    Repository
	updates chan model.UpdateMessage
}

func NewService(ctx context.Context, repo Repository, updates chan model.UpdateMessage) *Service {
	return &Service{repo: repo, updates: updates}
}

func generateToken(length int) (string, error) {

	b := make([]byte, length)

	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	// Кодируем байты в URL-безопасную base64 строку
	return base64.URLEncoding.EncodeToString(b), nil
}
func (s *Service) SetQrId(ctx context.Context) (string, error) {
	qr_code, err := generateToken(20)
	if err != nil {
		return "error ", fmt.Errorf("cam_auth.Service %n", err)
	}
	log.Println(qr_code)

	_, err = s.repo.SetQrId(ctx, qr_code)

	if err == pgx.ErrNoRows {
		return qr_code, err
	} else if err != nil {
		return qr_code, fmt.Errorf("statisticservice.GetStatisticByTrainingExercises: %w", err)
	}

	return qr_code, nil
}

func (s *Service) AuthUserForCam(ctx context.Context, user_id int, qr_code_id string) (bool, error) {
	flag, err := s.repo.SetUserToCam(ctx, user_id, qr_code_id)
	if err == pgx.ErrNoRows {
		return flag, err
	} else if err != nil {
		return flag, fmt.Errorf("statisticservice.GetStatisticByTrainingExercises: %w", err)
	}

	return flag, nil
}

/*
	func (s *Service) GetCameraStatus(ctx context.Context, qr_code_id string) (string, error) {
		status, err := s.repo.GetCameraStatus(ctx, qr_code_id)
		if err == pgx.ErrNoRows {
			return status, err
		} else if err != nil {
			return status, fmt.Errorf("statisticservice.GetStatisticByTrainingExercises: %w", err)
		}

		return status, nil
	}
*/
func (s *Service) GetUserIdToken(ctx context.Context, user_id int) (string, error) {
	status, err := authhandler.GenerateJWT(user_id)
	if err == pgx.ErrNoRows {
		return status, err
	} else if err != nil {
		return status, fmt.Errorf("statisticservice.GetStatisticByTrainingExercises: %w", err)
	}

	return status, nil
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func (s *Service) GetCameraStatus(ctx context.Context, user_id string, c *gin.Context) (string, error) {
	// Используем gin.Context вместо context.Context
	fmt.Println("Hello")
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return "", fmt.Errorf("websocket error: %v", err)
	}
	defer func() {
		if err := ws.Close(); err != nil {
			log.Printf("failed to close WebSocket: %v", err)
		}
	}()

	for {
		select {
		case msg := <-s.updates:
			fmt.Println(msg.NewUserID)
			if err := ws.WriteJSON(msg); err != nil {
				fmt.Println("WebSocket write error:", err)
				return "", err
			}
			token, err := authhandler.GenerateJWT(msg.NewUserID)
			if err != nil {
				return "", err
			}
			return token, nil
		case <-c.Request.Context().Done(): // Используем контекст запроса
			return "connection closed", nil
		}
	}
}
