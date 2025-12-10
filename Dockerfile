FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy the rest of the source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 4903
CMD ["node", "dist/app-server.js"]
