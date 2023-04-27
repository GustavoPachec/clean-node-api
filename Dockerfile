FROM node:18
WORKDIR /user/src/clean-node-api
COPY ./package.json .
RUN yarn install --only=prod

