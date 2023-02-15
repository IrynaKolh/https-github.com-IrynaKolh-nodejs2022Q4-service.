FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --legacy-peer-deps && npm cache clean --force
# RUN npm i -g ts-node nodemon

COPY . .

RUN npm run build

EXPOSE 4000
# CMD [ "node", "dist/main.js"]

CMD [ "npm", "run", "start:dev"]