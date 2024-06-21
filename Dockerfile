# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY server/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del servidor al directorio de trabajo
COPY server/ ./

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]