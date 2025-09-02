# Iniciar o backend
FROM node:22.19-alpine

RUN apk add --no-cache \
    bash \
    git \
    openssl \
    curl \
    netcat-openbsd \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Verificar as dependencias instaladas
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar o app
COPY . .


# Iniciar backend na porta 3000
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]