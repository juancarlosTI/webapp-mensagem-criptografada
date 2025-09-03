#!/usr/bin/env bash
set -e

# Espera o Postgres estar disponível
echo "Aguardando o Postgres..."
until nc -z postgres 5432; do
  echo "Postgres não disponível ainda. Tentando novamente em 1s..."
  sleep 1
done

echo "Postgres pronto! Rodando migrações..."
# Aplica as migrações
npx prisma migrate deploy

echo "Migrações aplicadas! Iniciando backend..."
# Inicia o backend
npm start
