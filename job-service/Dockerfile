FROM node:18-alpine

WORKDIR /usr/src/app

COPY job-service/package*.json ./

RUN npm install

COPY job-service/src ./src

EXPOSE 3004

CMD [ "node","src/service.js" ]
