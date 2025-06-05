package searching_training_model

import (
	trainingstatisticmodel "HSMGv2/internal/training_statistic/model"
	usermodel "HSMGv2/internal/user/model"
)

type TrainingFilter struct {
	SearchBar      *string  `json:"search_bar,omitempty"`
	Rating         *float64 `json:"rating,omitempty"`
	FavouriteCnt   *int     `json:"favourite_cnt,omitempty"`
	IDTrainingType *int     `json:"id_training_type,omitempty"`
	PriceMin       *float64 `json:"price_min,omitempty"`
	PriceMax       *float64 `json:"price_max,omitempty"`
	ViewsMin       *int     `json:"views_min,omitempty"`
	InTrainingCnt  *int     `json:"in_training_cnt,omitempty"`
}

type GeneralTrainingInfo struct {
	TrainingID  int                                      `json:"training_id"`
	Version     int                                      `json:"version"`
	Flag        int                                      `json:"flag"`
	Name        string                                   `json:"name"`
	Description string                                   `json:"description"`
	Image       string                                   `json:"image"`
	Type        string                                   `json:"type"`
	Price       float64                                  `json:"price"`
	Stat        trainingstatisticmodel.StatisticTraining `json:"statistics_training"`
	Author      usermodel.User                           `json:"author"`
}

type TrainingPrograms struct {
	TrainingPrograms []GeneralTrainingInfo `json:"training_programs"`
}
