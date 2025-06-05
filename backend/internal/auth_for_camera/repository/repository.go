package afc_rep

import (
	model "HSMGv2/internal/auth_for_camera/model"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	insert_new_camera         = `INSERT INTO auth_camera (id_user, qr_code) VALUES ($1, $2)`
	update_user_id_for_camera = `UPDATE auth_camera SET id_user = $1 WHERE qr_code = $2;`
	select_status             = "SELECT  id_user FROM auth_camera WHERE qr_code = $1"
)

type Repository struct {
	pgDB    *pgxpool.Pool
	mongoDB *mongo.Database
}

func NewRepository(ctx context.Context, pgDB *pgxpool.Pool, mongoDB *mongo.Database) *Repository {
	return &Repository{pgDB: pgDB, mongoDB: mongoDB}
}

func (r *Repository) SetQrId(ctx context.Context, qr_code_id string) (bool, error) {

	_, err := r.pgDB.Exec(ctx, insert_new_camera, "-1", qr_code_id)
	if err != nil {
		return false, fmt.Errorf("failed to insert camera : %v", err)
	}
	return true, nil
}

func (r *Repository) SetUserToCam(ctx context.Context, user_id int, qr_code_id string) (bool, error) {

	_, err := r.pgDB.Exec(ctx, update_user_id_for_camera, user_id, qr_code_id)
	if err != nil {
		return false, fmt.Errorf("failed to insert camera : %v", err)
	}
	return true, nil
}

func (r *Repository) GetCameraStatus(ctx context.Context, qr_code_id string) (string, error) {

	user_id := ""
	err := r.pgDB.QueryRow(ctx, select_status, qr_code_id).Scan(&user_id)
	fmt.Println(user_id)
	if err != nil {
		return "", fmt.Errorf("error %s", err)
	}
	return user_id, nil
}

func (r *Repository) GetUserId(ctx context.Context, user_id int) (string, error) {

	err := r.pgDB.QueryRow(ctx, select_status, user_id).Scan(&user_id)
	fmt.Println(user_id)
	if err != nil {
		return "", fmt.Errorf("error %s", err)
	}
	return "user_id", nil
}

func (r *Repository) ListenToPgNotifications(ctx context.Context, updates chan<- model.UpdateMessage) {
	// Подписываемся на канал
	_, err := r.pgDB.Exec(ctx, "LISTEN auth_camera_updates")
	if err != nil {
		log.Fatal("LISTEN error:", err)
	}

	// Основной цикл прослушивания
	for {
		select {
		case <-ctx.Done():
			log.Println("Завершение работы слушателя PostgreSQL")
			return

		default:
			// Получаем соединение из пула
			conn, err := r.pgDB.Acquire(ctx)
			if err != nil {
				log.Println("Ошибка получения соединения:", err)
				time.Sleep(1 * time.Second)
				continue
			}

			// Ожидаем уведомление
			notification, err := conn.Conn().WaitForNotification(ctx)
			conn.Release() // Возвращаем соединение в пул

			if err != nil {
				if errors.Is(err, context.Canceled) {
					return
				}
				log.Println("Ошибка WaitForNotification:", err)
				time.Sleep(1 * time.Second)
				continue
			}

			// Парсим JSON и отправляем в канал
			var msg model.UpdateMessage
			if err := json.Unmarshal([]byte(notification.Payload), &msg); err != nil {
				log.Println("Ошибка парсинга JSON:", err)
				continue
			}

			select {
			case updates <- msg:
				log.Printf("Отправлено сообщение: %+v\n", msg)
			case <-ctx.Done():
				return
			}
		}
	}

}
