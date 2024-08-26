package config

import (
	"github.com/caarlos0/env"
	"github.com/gofiber/fiber/v2/log"
	"github.com/joho/godotenv"
)

type EnvConfig struct {
	ServerPort  string `env:"SERVER_PORT,required"`
	DB_HOST     string `env:"DB_HOST,required"`
	DB_NAME     string `env:"DB_NAME,required"`
	DB_USER     string `env:"DB_USER,required"`
	DB_PASSWORD string `env:"DB_PASSWORD,required"`
	DB_SSLMODE  string `env:"DB_SSLMODE,required"`
}

func NewEnvConfig() *EnvConfig {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Unable to load the .env file %e", err)
	}

	config := &EnvConfig{}

	if err := env.Parse(config); err != nil {
		log.Fatal("Unable to load variables from the .env %e", err)
	}

	return config
}
