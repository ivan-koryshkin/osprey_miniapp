FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY src src
COPY public public
COPY server.js server.js

ARG PUBLIC_URL=miniapp
RUN npm install
RUN npm run build
CMD ["node", "server.js"]
