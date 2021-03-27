FROM node:12-alpine
MAINTAINER Shreyas
USER root
RUN apk --update add tzdata && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone && apk del tzdata
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["sh", "./start.sh"]