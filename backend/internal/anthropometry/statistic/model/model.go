package anthropometry_stat_model

import anthropometrymodel "HSMGv2/internal/anthropometry/general/model"

type AnthropometryStat struct {
	Stat []anthropometrymodel.Anthropometry `json:"anthropomery_stat"`
}

type Filter struct {
	StartDate *string `json:"start_date,omitempty"`
	EndDate   *string `json:"end_date,omitempty"`
}
