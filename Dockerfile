FROM node:22-alpine3.18 AS base
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow

WORKDIR /opt/app

COPY package*.json ./
RUN npm install --install

COPY . .

FROM base

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]

