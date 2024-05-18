FROM node:20.12.2

WORKDIR /usr/node-course-nest-js/src

#package.json package-lock.json
COPY package*.json /app
COPY . .

RUN npm install

CMD [ "nest", "start" ]

