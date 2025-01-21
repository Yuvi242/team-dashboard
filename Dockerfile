# Step 1: Use Node.js as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the entire project directory
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Expose the application port
EXPOSE 3000

# Step 7: Define the command to start the application
CMD ["npm", "start"]
