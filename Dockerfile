FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY src .
RUN npm run build
RUN npm install -g serve
EXPOSE 3001
