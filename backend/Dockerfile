FROM node:8-alpine

ENV NODE_VERSION 8.11.1

# Allow to node to open low ports
RUN apk add --no-cache \
	--virtual .setcap-deps \
	libcap \
	&& setcap 'cap_net_bind_service=+ep' `readlink -f \`which node\`` \
	&& apk del .setcap-deps

WORKDIR /backend
COPY package.json .

RUN npm install -g nodemon mocha
RUN npm install
EXPOSE 80

CMD nodemon index.js
