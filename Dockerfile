FROM node:alpine

COPY . .

RUN yarn

RUN yarn build

CMD yarn start