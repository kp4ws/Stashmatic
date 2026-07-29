up:
	docker compose up

down:
	docker compose down

build:
	docker compose up --build --detach
	docker compose exec api alembic -c /app/api/alembic.ini upgrade head
	docker compose exec api python /app/api/scripts/seed_categories.py

logs:
	docker compose logs -f

api:
	docker compose logs -f api

web:
	docker compose logs -f web

migrate:
	docker compose exec api alembic -c /app/api/alembic.ini upgrade head

makemigrations:
	docker compose exec api alembic -c /app/api/alembic.ini revision --autogenerate -m "$(m)"

seed:
	docker compose exec api python /app/api/scripts/seed_mock.py

types:
	docker compose exec web npm run generate:types