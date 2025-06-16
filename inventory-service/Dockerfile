# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3120

# Define el comando de inicio para la aplicación
CMD ["npm", "start"]
