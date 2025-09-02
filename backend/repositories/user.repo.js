import { prisma } from '../generated/prisma/index.js';

export class UserRepository {
  async create(user) {
    // Cria um novo usuário no banco
    return await prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email
      }
    });
  }

  async findById(id) {
    // Procura um usuário pelo ID no banco
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  async saveKeys(keys) {
    return await prisma.keys.create({
      data: {
        chave_publica: keys.chave_publica,
        chave_privada: keys.chave_privada,
        userId: keys.user
      }
    });
  }
}

