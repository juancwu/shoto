package api

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/charmbracelet/log"
	"github.com/labstack/echo/v4"
)

type Shoto struct {
	Id    int64  `json:"id"`
	Name  string `json:"name"`
	Url   string `json:"url"`
	Ref   string `json:"ref"`
	Owner string `json:"owner"`
}

func QueryShotos(db *sql.DB) []Shoto {
	rows, err := db.Query("SELECT id, name, url, ref, owner FROM shotos;")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()

	var shotos []Shoto

	for rows.Next() {
		var shoto Shoto

		// TODO: make it so that it can read until the very end
		if err := rows.Scan(&shoto.Id, &shoto.Name, &shoto.Url, &shoto.Ref, &shoto.Owner); err != nil {
			fmt.Println("Error scanning row", err)
			return make([]Shoto, 0)
		}

		shotos = append(shotos, shoto)
		log.Info("Shoto", "id", shoto.Id, "name", shoto.Name, "url", shoto.Url, "ref", shoto.Ref, "owner", shoto.Owner)
	}

	if err := rows.Err(); err != nil {
		log.Error("Error during rows iteration", "err", err)
		return make([]Shoto, 0)
	}

	return shotos
}

func HandleShoto(c echo.Context) error {
	return nil
}
