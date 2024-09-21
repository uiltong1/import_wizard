FROM node:22

WORKDIR /app

COPY package*.json ./

COPY .env.example .env

RUN npm install

COPY ./src ./src

RUN chmod -R 755 ./src

COPY tsconfig.json ./

CMD ["npm", "run", "dev"]
