package main

import (
	"github.com/abhiramkrishnam/ticket-management-be/handlers"
	"github.com/abhiramkrishnam/ticket-management-be/repositories"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName:      "TicketManagement",
		ServerHeader: "Fiber",
	})

	eventRepository := repositories.NewEventRepository(nil)

	server := app.Group("/api")

	handlers.NewEventHandler(server.Group("/event"), eventRepository)

	app.Listen(":3000")

}
