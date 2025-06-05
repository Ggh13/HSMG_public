package statisticmodel

type StatisticByExersice struct {
	Graph map[string]float64 `json:"data"`
}

type StatisticExersiceRequest struct {
	UserId     int `json:"user_id" bson:"user_id"`
	IdExercise int `json:"id_exercise" bson:"id_exercise"`
}
