# Stage 1: Build Stage
FROM oven/bun:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb to cache dependencies
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun build ./index.js --outdir ./dist --target bun --sourcemap

# Stage 2: Production Stage
FROM oven/bun:alpine AS production

# Set working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist ./
COPY ./public ./public

ENV MODE=production
# Set the default command to run the application
CMD ["bun", "run", "index.js"]