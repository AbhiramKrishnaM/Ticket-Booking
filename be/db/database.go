package db

import (
	"fmt"

	"github.com/abhiramkrishnam/ticket-management-be/config"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Init(config *config.EnvConfig, DBMigrator func(db *gorm.DB) error) *gorm.DB {
	uri := fmt.Sprintf(`host=%s user=%s password=%s dbname=%s sslmode=%s`,
		config.DB_HOST, config.DB_USER, config.DB_PASSWORD, config.DB_NAME, config.DB_SSLMODE,
	)

	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatalf("Failed to connect to database: %e", err)
	}

	log.Info("Connected to database!")

	if err := DBMigrator(db); err != nil {
		log.Fatalf("Unable to migrate tables: %e", err)
	}

	return db
}
