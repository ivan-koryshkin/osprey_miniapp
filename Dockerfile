FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY src src
COPY public public

RUN npm install
RUN npm install -g serve
RUN npm run build --production