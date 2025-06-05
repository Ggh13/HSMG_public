package librariesmodel

type Exercise struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Link string `json:"link_video"`
}

type Exercises struct {
	Exercises []Exercise `json:"exercises"`
}
