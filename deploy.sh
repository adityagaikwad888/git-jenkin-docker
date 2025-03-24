#!/bin/bash

# Variables
IMAGE_NAME=adityagaikwad888/node-app:latest
CONTAINER_NAME=my-node-app

echo "Deploying $IMAGE_NAME as $CONTAINER_NAME..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running"
  exit 1
fi

# Pull latest image
echo "Pulling latest image..."
docker pull $IMAGE_NAME

# Stop and remove old container (if exists)
echo "Cleaning up old container..."
docker stop $CONTAINER_NAME > /dev/null 2>&1 || true
docker rm $CONTAINER_NAME > /dev/null 2>&1 || true

# Run updated container
echo "Starting new container..."
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME

# Verify container is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "Deployment successful! Container is running."
else
  echo "Error: Container failed to start."
  exit 1
fi

# Clean up unused Docker images to save space
echo "Cleaning up unused images..."
docker image prune -f