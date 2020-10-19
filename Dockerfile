FROM node:10

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . ./

ENV NODE_ENV=prod \
  NODE_PORT=3000

CMD [ "yarn", "build" ]