###### SETUP BASE RUNTIME IMAGE ######

FROM node:12.16.3 AS base
RUN yarn global add pm2@3.5.1


###### BUILD SOURCE ######

FROM node:12.16.3 AS build
WORKDIR /app

COPY /tsconfig.json ./
COPY /package.json ./
COPY /yarn.lock ./

RUN yarn install --non-interactive

COPY /src/ ./src/

RUN yarn build


###### CREATE PRODUCTION IMAGE ######

FROM node:12.16.3 AS production
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/dist/ ./

RUN yarn install --non-interactive --production


###### CREATE RUNTIME IMAGE ######

FROM base AS final
WORKDIR /app

COPY --from=production /app/ ./

CMD ["pm2-runtime", "start", "index.js", "--node-args", "\"--max-http-header-size=32768\""]

