# Build stage 1
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Build stage 2
FROM builder as build
WORKDIR /usr/src/app
COPY tsconfig*.json ./
COPY . .
RUN npm run build auth

# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=build ./usr/src/app/dist/apps/auth ./dist/auth

CMD ["node", "dist/auth/main.js"] 