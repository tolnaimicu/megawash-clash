# Step 1: Use an official lightweight Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy only the package files first (for better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project
COPY . .

# Step 6: Compile TypeScript to JavaScript
RUN npx tsc

# Step 7: Set the default command to run the compiled CLI
CMD ["node", "dist/main.js"]
