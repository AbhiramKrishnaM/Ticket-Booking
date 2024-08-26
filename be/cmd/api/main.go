package main

import (
	"fmt"

	"github.com/abhiramkrishnam/ticket-management-be/config"
	"github.com/abhiramkrishnam/ticket-management-be/db"
	"github.com/abhiramkrishnam/ticket-management-be/handlers"
	"github.com/abhiramkrishnam/ticket-management-be/repositories"
	"github.com/gofiber/fiber/v2"
)

func main() {

	envConfig := config.NewEnvConfig()

	db := db.Init(envConfig, db.DbMigrator)

	app := fiber.New(fiber.Config{
		AppName:      "TicketManagement",
		ServerHeader: "Fiber",
	})

	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)

	server := app.Group("/api")

	handlers.NewEventHandler(server.Group("/event"), eventRepository)
	handlers.NewTicketHandler(server.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))

}
