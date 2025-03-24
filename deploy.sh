#!/bin/bash

# Variables
IMAGE_NAME=adityagaikwad888/node-app:latest
TIMESTAMP=$(date +%Y%m%d%H%M%S)
CONTAINER_NAME=node-app-${TIMESTAMP}  # Unique name to avoid conflicts

echo "Deploying $IMAGE_NAME as $CONTAINER_NAME on port 80..."

# Check if Docker is running (with sudo)
if ! sudo docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running"
  exit 1
fi

# Pull latest image
echo "Pulling latest image..."
sudo docker pull $IMAGE_NAME

# Stop and remove previous containers
echo "Cleaning up any old containers..."
OLD_CONTAINERS=$(sudo docker ps -a -q --filter name=node-app)
if [ ! -z "$OLD_CONTAINERS" ]; then
  echo "Found old containers. Stopping and removing..."
  sudo docker stop $OLD_CONTAINERS > /dev/null 2>&1 || true
  sudo docker rm -f $OLD_CONTAINERS > /dev/null 2>&1 || true
fi

# Run updated container on port 80
echo "Starting new container on port 80..."
CONTAINER_ID=$(sudo docker run -d -p 80:3000 --name $CONTAINER_NAME $IMAGE_NAME)

# Wait briefly for container to initialize
sleep 2

# Verify container is running
if [ "$(sudo docker ps -q -f id=$CONTAINER_ID)" ]; then
  PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
  echo "=============================================="
  echo "✅ Deployment successful!"
  echo "Container: $CONTAINER_NAME"
  echo "Container ID: $CONTAINER_ID"
  echo "Application URL: http://$PUBLIC_IP"
  echo "=============================================="
else
  echo "Error: Container failed to start. Container logs:"
  sudo docker logs $CONTAINER_ID
  exit 1
fi

# Clean up unused Docker images to save space
echo "Cleaning up unused images..."
sudo docker image prune -f