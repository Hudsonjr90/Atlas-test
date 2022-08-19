.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

start: up install_frontend install_backend migrate ## Start services

restart: recreate install_frontend install_backend migrate ## Restart services

install_frontend: up ## Install all dependecies frontend
	@echo "\n>> Install node dependecies\n"
	@docker-compose exec cate-app npm install
	@docker-compose exec cate-app npm run prod

watch_frontend: up ## Watch file changes on frontend
	@echo "\n>> Watch node changes\n"
	@docker-compose exec cate-app npm run watch

install_backend: up ## Install all dependecies backend
	@echo "\n>> Install php dependecies\n"
	@docker-compose exec cate-app ln -sf .env.example .env
	@docker-compose exec cate-app composer install

migrate: up ## Install all dependecies backend
	@echo "\n>> Migrate databases\n"
	@docker-compose exec cate-app php artisan migrate

up: ## Up all containers
	@echo "\n>> Up cate Containers\n"
	@docker-compose up -d --build

recreate: ## Recreate all containers
	@echo "\n>> Recreate cate Containers\n"
	@docker-compose up -d --build --force-recreate

run_tests: ## Run tests
	@echo "\n>> Run tests\n"
	@docker-compose exec cate-app php artisan test --parallel
