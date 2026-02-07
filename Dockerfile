# deps
FROM node:20-alpine AS deps
WORKDIR /service
COPY package*.json ./
RUN npm ci

# build
FROM node:20-alpine AS build
WORKDIR /service
COPY --from=deps /service/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- prod ----
FROM node:20-alpine AS prod
WORKDIR /service
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /service/dist ./dist

# server
EXPOSE 3010
CMD ["node", "dist/main.js"]