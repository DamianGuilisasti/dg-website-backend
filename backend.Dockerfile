FROM node:16.5.0-alpine

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]