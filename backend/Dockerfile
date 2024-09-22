FROM node:22

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY env_example /app/.env

COPY src ./src

RUN chmod -R 755 ./src

