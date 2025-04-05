# Step 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build the app
COPY . .
RUN npm run build

# Step 2: Serve the build with a lightweight web server
FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (Cloud Run uses default 8080 internally)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
