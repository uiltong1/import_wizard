FROM node:22

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/env_example /app/.env

COPY ./backend/src ./src

RUN chmod -R 755 ./src

