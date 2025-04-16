FROM node:22

RUN mkdir /app
WORKDIR /app

# Установка зависимостей
COPY package*.json .
RUN npm install --omit=dev

COPY . .
EXPOSE 3000

CMD ["npm", "run", "host"]