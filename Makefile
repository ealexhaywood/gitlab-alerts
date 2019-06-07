.PHONY: docker

build:
	npm i

run:
	npm start

dev:
	npm run dev

docker:
	docker build -t ealexhaywood/gitlab-alerts:latest .

