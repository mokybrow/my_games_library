FROM node:latest as build

# Installs latest Chromium (63) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge


WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . /app/
RUN npm run build
RUN npm install -g serve

CMD serve -s build -l 3000