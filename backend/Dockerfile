# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and directories to the working directory in the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run  app
CMD ["npm", "start"]
