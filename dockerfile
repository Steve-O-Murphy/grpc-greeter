# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose gRPC port
EXPOSE 50051

# Default environment
ENV NODE_ENV=prod

# Start the server
CMD ["node", "server.js"]