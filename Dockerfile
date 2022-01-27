FROM node:alpine

RUN mkdir -p /usr/src/market-api && chown -R node:node /usr/src/market-api

WORKDIR /usr/src/market-api

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
