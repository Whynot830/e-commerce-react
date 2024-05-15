FROM node:22-alpine3.18 AS base
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow

WORKDIR /opt/app

COPY package*.json ./
RUN npm install --install

COPY . .

# dev
FROM base AS development

EXPOSE 3000

CMD ["npm", "run", "dev"]

# production
FROM base AS production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

