package anthropometrymodel

import "time"

type Anthropometry struct {
	ID              int       `json:"id"`
	UserID          int       `json:"user_id"`
	Height          float64   `json:"height"`
	Weight          float64   `json:"weight"`
	NeckGirth       float64   `json:"neck_girth"`
	ShoulderGirth   float64   `json:"shoulder_girth"`
	ChestGirth      float64   `json:"chest_girth"`
	WaistGirth      float64   `json:"waist_girth"`
	BicepsGirth     float64   `json:"biceps_girth"`
	ForearmsGirth   float64   `json:"forearms_girth"`
	HipGirth        float64   `json:"hip_girth"`
	QuadricepsGirth float64   `json:"quadriceps_girth"`
	CalfGirth       float64   `json:"calf_girth"`
	WristGirth      float64   `json:"wrist_girth"`
	AnkleGirth      float64   `json:"ankle_girth"`
	Date            time.Time `json:"date"`
}
