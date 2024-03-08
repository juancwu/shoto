package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/charmbracelet/log"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/tursodatabase/libsql-client-go/libsql"

	"github.com/joho/godotenv"
	"github.com/juancwu/shoto/api"
)

func main() {
	appEnv := os.Getenv("APP_ENV")
	if appEnv != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal(err)
		}
	}

	url := os.Getenv("DATABASE_URL")
	token := os.Getenv("DATABASE_TOKEN")

	db, err := sql.Open("libsql", fmt.Sprintf(url, token))
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db %s: %s", url, err)
		os.Exit(1)
	}
	defer db.Close()

	e := echo.New()

	e.Use(middleware.Logger())
	e.GET("/l/:shoto", api.HandleShoto)
	e.GET("/", func(c echo.Context) error {
		shotos := api.QueryShotos(db)
		return c.JSON(http.StatusOK, shotos)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "5173"
	}

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
