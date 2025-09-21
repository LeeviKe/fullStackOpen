FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--legacy-watch", "./bin/www"]
