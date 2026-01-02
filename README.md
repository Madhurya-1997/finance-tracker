# finance-tracker

Using docker for mongodb
- docker image pull mongo:latest
<!-- This is to persist the data even when the container is killed -->
- docker volume create my-mongo-volume 

- docker run --name my-mongo-server -p 27107:27107 -d -e MONGO_ROOT_USERNAME=admin -e MONGO_ROOT_PASSWORD=password123 -v my-mongo-volume:/data/db mongo

- docker exec -it bash <CONTAINER_NAME>