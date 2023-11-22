FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./

COPY .env ./

RUN npm install -g dotenv-cli

RUN npm install

RUN apk update

RUN apk add --no-cache git bash openssh

COPY . .

EXPOSE 3000

CMD npm run dev