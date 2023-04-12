# Base image
FROM node:14-alpine as build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Base image
FROM nginx:1.21-alpine

# Copy built app files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]