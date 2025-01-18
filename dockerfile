FROM node:18-slim


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

COPY .env .env

EXPOSE 3000

CMD ["node", "index.js"]