FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm ci

RUN npm run test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]