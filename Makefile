-include .env

data-init:
	cd ./docker/neo4j/init && go build && ./neo4j-h3-init

up:
	docker compose build && docker compose up -d

logs:
	docker compose logs -f

down:
	docker compose down

db:
	docker exec -it $(POSTGRES_CONTAINER_HOST) psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

go:
	docker exec -it $(GO_CONTAINER_HOST) /bin/sh
