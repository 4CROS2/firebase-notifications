FROM node:18-slim

WORKDIR /usr/src/app

# Copiar y realizar instalación de dependencias primero
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer variables de entorno como parte del entorno del contenedor
ENV NODE_ENV=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
