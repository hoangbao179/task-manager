# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:20

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code to the working directory.
COPY src/ ./src

# Expose port 5000 to the outside world.
EXPOSE 5000

# Command to run the application.
CMD [ "npm", "start" ]
