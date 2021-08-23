dev-up:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build

dev-down:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml down

prod-up:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build -d

prod-down:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml down