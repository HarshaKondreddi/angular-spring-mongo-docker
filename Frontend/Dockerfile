# Use Node.js 20 LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set Node options to allow legacy OpenSSL providers
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose port 4200
EXPOSE 4200

# Start the development server with additional flags for Docker
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check", "--poll", "2000"]

