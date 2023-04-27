FROM node:12
WORKDIR /user/src/clean-node-api
COPY ./package.json .
RUN yarn install --only=prod
COPY ./dist ./dist
EXPOSE 3333
CMD yarn start
