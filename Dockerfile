
# DO NOT FORGET to build your project before building the container

FROM node:10.6.0-alpine
MAINTAINER "Maxime AUBURTIN"

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install --production
COPY ./dist/ /app

EXPOSE 3000
CMD ["node", "server.js"]