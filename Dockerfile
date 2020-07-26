FROM node:12-alpine
MAINTAINER Shreyas
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80 3000
ENTRYPOINT ["sh", "./start.sh"]