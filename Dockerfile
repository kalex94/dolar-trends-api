FROM node:14.18-alpine

ARG GIT_FRONTEND_URL

RUN apk update
RUN apk add git

WORKDIR /home/app

COPY . .

RUN touch .env

RUN echo 'NODE_ENV="production"'>.env

WORKDIR /

RUN git clone $GIT_FRONTEND_URL client

WORKDIR client

RUN npm ci

RUN npm run build

RUN npm run export

WORKDIR /

RUN mv client/out /home/app/src/out

RUN rm -r client

WORKDIR /home/app

RUN npm i

RUN mkdir images

EXPOSE 80

CMD ["npm", "start"]