# Use Node.js official slim image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Conditionally copy the .env file if ENV_FILE_PATH is provided
ARG ENV_FILE_PATH
RUN if [ -n "$ENV_FILE_PATH" ] && [ -f "$ENV_FILE_PATH" ]; then \
    cp "$ENV_FILE_PATH" .env; \
    else \
    echo "No valid ENV_FILE_PATH provided, using default environment settings"; \
    echo "PORT=3000" > .env; \
    echo "ENV_VAR=default-docker-value" >> .env; \
    fi

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]