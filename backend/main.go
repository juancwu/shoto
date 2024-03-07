package main

import (
	"fmt"
	"os"

	"github.com/juancwu/shoto/api"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.GET("/l/:shoto", api.HandleShoto)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5173"
	}

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
