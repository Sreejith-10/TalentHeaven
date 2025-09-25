FROM node:18-alpine

WORKDIR /usr/src/app

COPY recruiter-service/package*.json ./

RUN npm install

COPY recruiter-service/src ./src

EXPOSE 3002

CMD [ "node","src/service.js" ]