import { prisma } from '../generated/prisma/index.js';

export class CriptografyRepository {
  async create(userId, data) {
    // Cria um novo registro de chave no banco
    return await prisma.keys.create({
      data: {
        chave_publica: data.chave_publica,
        chave_privada: data.chave_privada,
        userId: userId
      }
    });
  }
}