FROM node:18-slim

WORKDIR /usr/src/app

# Copiar y realizar instalación de dependencias primero
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Copiar el archivo de credenciales de Google al contenedor
COPY quickdrop.json /usr/src/app/quickdrop.json

# Exponer las variables de entorno
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/quickdrop.json"
ENV NODE_ENV=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
