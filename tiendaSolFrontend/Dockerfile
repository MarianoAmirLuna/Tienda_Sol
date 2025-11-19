FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

EXPOSE 5173

RUN npm install -g serve

COPY --from=builder /app/dist /usr/share/nginx/html