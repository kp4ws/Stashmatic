up:
	docker compose up

down:
	docker compose down

build:
	docker compose up --build

logs:
	docker compose logs -f

api:
	docker compose logs -f api

web:
	docker compose logs -f web

migrate:
	docker compose exec api alembic -c api/alembic.ini upgrade head

makemigrations:
	docker compose exec api alembic -c api/alembic.ini revision --autogenerate -m "$(m)"

seed:
	docker compose exec api python internal/seed_db.py

types:
	docker compose exec web npm run gen-types