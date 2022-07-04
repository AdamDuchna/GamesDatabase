FROM node:alpine AS builder
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /opt/app/build/ .