FROM node:18-alpine

WORKDIR /usr/src/app

COPY chat-service/package*.json ./

RUN npm install

COPY chat-service/src ./src

EXPOSE 3005

CMD [ "node","src/service.js" ]
