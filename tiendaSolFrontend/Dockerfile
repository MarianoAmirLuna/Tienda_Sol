FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build 

FROM node:20-alpine

ENV PORT 5173
EXPOSE 5173

RUN npm install -g serve

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["serve", "-s", "/usr/share/nginx/html", "-l", "5173"]