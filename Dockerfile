FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

CMD ["/wait-for-it.sh", "db:5432", "--", "npm", "start"]