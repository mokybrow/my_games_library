FROM node:latest as build

WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . /app/
RUN npm run build
RUN npm install -g serve

CMD serve -s build -l 3000