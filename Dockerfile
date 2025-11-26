# --- Stage 1: Build the React App ---
FROM node:18-alpine as build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . ./

# Run the build script from your package.json ("tsc -b && vite build")
RUN npm run build

# --- Stage 2: Serve the built app with Nginx ---
FROM nginx:1.23-alpine

# The 'npm run build' command in the previous stage creates a 'dist' folder.
# Copy the contents of that 'dist' folder to the default Nginx web root.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration file.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 by default, so we expose it.
EXPOSE 80

# This command starts Nginx in the foreground when the container launches.
CMD ["nginx", "-g", "daemon off;"]