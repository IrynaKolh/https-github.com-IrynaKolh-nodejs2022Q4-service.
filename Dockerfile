FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --legacy-peer-deps && npm cache clean --force
# RUN npm i -g ts-node nodemon

COPY . .
# RUN npx prisma generate

# RUN npm run build

EXPOSE ${PORT}
# CMD [ "node", "dist/main.js"]

CMD [ "npm", "run", "start:prisma"]