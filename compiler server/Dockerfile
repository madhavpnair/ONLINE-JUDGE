# Base image with Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /OJ

# Install necessary compilers and tools
RUN apk update && apk add --no-cache \
    g++ \
    openjdk17-jdk \
    python3 \
    make \
    bash

# Copy source code
COPY . .

# Install npm dependencies
RUN npm install

# Expose the port your compiler server listens on
EXPOSE 8000

# Start the server
CMD ["node", "index.js"]
