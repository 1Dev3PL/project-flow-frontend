#!/bin/bash

echo "Building frontend image..."
docker build -f Dockerfile -t 1dev3pl/project-flow-frontend .
if [ $? -eq 0 ]; then
  echo "Pushing frontend image..."
  docker push 1dev3pl/project-flow-frontend
else
  echo "Frontend build failed."
  exit 1
fi

echo "Frontend image built and pushed successfully."
