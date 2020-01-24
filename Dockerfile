# Create an image for production
# FROM node:12.14.1-slim
FROM node:12.14.1-alpine3.11

COPY . /tmp/builder

RUN cd /tmp/builder && \ 
    npm ci && \ 
    npm run build && \ 
    mkdir -p /app/node_modules && \ 
    chown -R node:node /app && \ 
    cp -a /tmp/builder/dist /app/dist && \
    cd /app

WORKDIR /app
COPY package*.json .env ./
RUN npm install --production && rm -rf /tmp/builder/

EXPOSE 3000

CMD ["node", "dist/index.js"]