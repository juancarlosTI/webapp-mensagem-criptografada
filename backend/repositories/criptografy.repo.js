import { prisma } from '../prisma/prisma.js';

export class CriptografyRepository {
  constructor(userRepo) {
    this.userRepository = userRepo;
  }
  async createKeys(keys) {
    // Cria um novo registro de chave no banco
    return await this.userRepository.saveKeys({

      chave_publica: keys.chave_publica,
      chave_privada: keys.chave_privada,
      userId: keys.userId

    });
  }
}