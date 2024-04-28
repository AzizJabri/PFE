FROM ubuntu

# Install NGINX
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Copy the build files from local dist folder to NGINX HTML directory
COPY dist /var/www/html/

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]