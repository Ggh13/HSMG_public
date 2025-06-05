FROM node:20-alpine

WORKDIR /app

# Отключаем Husky при установке
ENV HUSKY=0

# Копируем только файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости (игнорируя prepare-скрипт)
RUN npm install --ignore-scripts

# Копируем остальные файлы
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]