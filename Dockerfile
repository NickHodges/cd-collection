# Use the official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install the app dependencies
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
