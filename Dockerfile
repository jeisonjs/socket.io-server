FROM node:12.14.1-alpine3.11
MAINTAINER Jeison Perez <jperez@jacidi.com>

# Install app dependencies
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install
RUN npm install -g pm2

RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/
#RUN chown -R node:node /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . ./usr/src/app

EXPOSE 3000

# CMD ["pm2-runtime","--json", "ecosystem.config.js"]
# CMD ["npm", "run", "build"]