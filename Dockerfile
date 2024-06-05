FROM node:21.2

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "start"]
