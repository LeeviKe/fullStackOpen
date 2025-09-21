FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--legacy-watch", "./bin/www"]