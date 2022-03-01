FROM node:16-bullseye-slim
ENV PORT 3000
RUN apt-get update
RUN apt-get install -y curl vim net-tools
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g npm
COPY ./package*.json ./
#UN npm install
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm start
