package trainingstatisticmodel

type StatisticTraining struct {
	Views         int     `json:"views"`
	Favourite     int     `json:"favourite"`
	InTraining    int     `json:"in_training"`
	Rating        float64 `json:"rating"`
	Reviews_count int     `json:"reviews_count"`
	Reviews       Reviews `json:"reviews"`
}

type Reviews struct {
	UserReview []UserReview `json:"user_review"`
}

type UserReview struct {
	ID         int     `json:"id"`
	UserRating float64 `json:"user_rating"`
	Rating     int     `json:"rating"`
	ReviewText string  `json:"review"`
}
