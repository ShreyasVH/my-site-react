FROM node:12-alpine
MAINTAINER Shreyas
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80 3000
ENTRYPOINT ["sh", "./start.sh"]