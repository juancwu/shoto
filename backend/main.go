package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/juancwu/shoto/api"

	"github.com/charmbracelet/log"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	appEnv := os.Getenv("APP_ENV")
	if appEnv != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal(err)
		}
	}

	e := echo.New()

	e.Use(middleware.Logger())
	e.GET("/l/:shoto", api.HandleShoto)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5173"
	}

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
