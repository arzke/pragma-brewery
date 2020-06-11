FROM node:14.4.0-alpine AS tests

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY __mocks__ __mocks__
COPY src src
COPY jest.config.mjs jest.config.mjs
COPY .env .env

RUN npm ci
RUN npm run test

FROM node:14.4.0-alpine

WORKDIR /app

COPY --from=tests /app/package.json package.json
COPY --from=tests /app/package-lock.json package-lock.json
COPY --from=tests /app/src src
COPY --from=tests /app/.env .env

RUN npm ci --only=production

CMD ["npm", "start"]