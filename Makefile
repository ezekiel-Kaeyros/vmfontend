build:
	docker build . -t vmdo-frontend

run:
	docker run -p 9090:80 vmdo-frontend

.PHONEY: build run