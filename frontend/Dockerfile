FROM node:20-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

RUN npm install

# Copie du reste de l'application
COPY . .

EXPOSE 5173

# Commande pour le serveur de dev Vite
CMD ["npm", "run", "dev", "--", "--host"]