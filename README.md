# finance-tracker

Using docker for mongodb
- docker image pull mongo:latest
<!-- This is to persist the data even when the container is killed -->
- docker volume create my-mongo-volume 

- docker run --name my-mongo-server -p 27017:27017 -d -e MONGO_ROOT_USERNAME=admin -e MONGO_ROOT_PASSWORD=password123 -v my-mongo-volume:/data/db mongo --replSet rs0
- docker run --name my-mongo-server -p 27017:27017 -d -v my-mongo-volume:/data/db mongo --replSet rs0

- docker exec -it <CONTAINER_ID> bash