FROM node:22.19-alpine

RUN apk add --no-cache bash git openssl curl netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3000

# Use o script de start que aguarda o banco e roda as migrações
CMD ["./start.sh"]
