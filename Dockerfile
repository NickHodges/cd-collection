# Use the official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container to /usr/src/app/src
WORKDIR /app

# Copy the current directory contents into the container at /usr/src/app
COPY . /app

# If you have dependencies, install them
RUN npm install

# Transpile your TypeScript to JavaScript
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]
