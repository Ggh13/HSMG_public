package authmodel

import "golang.org/x/crypto/bcrypt"

type UserRegister struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	NickName string `json:"nickname"`
}

type UserAuth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func HashPassword(password *string) error {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	*password = string(hashedPass)
	return nil
}

func CheckPassword(password1, password2 *string) error {
	return bcrypt.CompareHashAndPassword([]byte(*password1), []byte(*password2))
}
