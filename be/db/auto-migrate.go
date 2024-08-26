package db

import (
	"github.com/abhiramkrishnam/ticket-management-be/models"
	"gorm.io/gorm"
)

func DbMigrator(db *gorm.DB) error {
	return db.AutoMigrate(&models.Event{}, &models.Ticket{})
}
