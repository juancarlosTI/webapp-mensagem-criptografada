export class UserRepository {
  constructor(prisma){
    this.prisma = prisma
  }
  async create(user) {
    // Cria um novo usuário no banco
    return await this.prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email
      }
    });
  }

  async findById(id) {
    // Procura um usuário pelo ID no banco
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async saveKeys(user,keys) {
    console.log("Save Keys!", keys);

    if (!keys || !user){
      return null
    }

    const saveKeys = await this.prisma.keys.create({
      data: {
        chave_publica: keys.chave_publica,
        chave_privada: keys.chave_privada,
        userId: user
      }
    });

    if (!saveKeys){
      return null
    }

    return saveKeys;
  }
}

