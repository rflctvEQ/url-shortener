# Use the official Node.js v22 image
FROM node:22.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose the port your app runs on (e.g., 5001)
EXPOSE 5001

# Set the default command to run your app
CMD ["node", "server.js"]

# --- Frontend (React) support (optional) ---
# Uncomment and adjust below if building frontend inside this container

# WORKDIR /app/client
# COPY client/package*.json ./
# RUN npm install
# COPY client/ .
# RUN npm run build
