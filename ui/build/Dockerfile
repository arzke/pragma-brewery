FROM node:14.4.0-alpine AS build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .babelrc .babelrc
COPY src src
COPY static static

RUN npm ci
RUN npm run test
RUN npm run build

FROM nginx:1.19.0-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .