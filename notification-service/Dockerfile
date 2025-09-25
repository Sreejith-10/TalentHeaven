FROM node:18-alpine

WORKDIR /usr/src/app

COPY notification-service/package*.json ./

RUN npm install

COPY notification-service/src ./src

EXPOSE 3004

CMD [ "node","src/service.js" ]
