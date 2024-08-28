package main

import (
	"fmt"

	"github.com/abhiramkrishnam/ticket-management-be/config"
	"github.com/abhiramkrishnam/ticket-management-be/db"
	"github.com/abhiramkrishnam/ticket-management-be/handlers"
	middlewares "github.com/abhiramkrishnam/ticket-management-be/middleware"
	"github.com/abhiramkrishnam/ticket-management-be/repositories"
	"github.com/abhiramkrishnam/ticket-management-be/services"
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
	authRepository := repositories.NewAuthRepository(db)

	// Service
	authService := services.NewAuthService(authRepository)

	server := app.Group("/api")

	handlers.NewAuthHandler(server.Group("/auth"), authService)

	privateRoutes := server.Use(middlewares.AuthProtected(db))

	handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))

}
