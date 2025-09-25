FROM node:18-alpine

WORKDIR /usr/src/app

COPY user-service/package*.json ./

RUN npm install

COPY user-service/src ./src

EXPOSE 3003

CMD [ "node","src/service.js" ]
