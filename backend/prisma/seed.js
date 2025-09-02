import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' }
  ];

  for (const u of users) {
    // Criptografar senha antes de salvar
    const hashedPassword = await bcrypt.hash(u.password, 10);

    await prisma.user.upsert({
      where: { username: u.username },
      update: {}, // não atualiza se já existir
      create: {
        username: u.username,
        password: hashedPassword
      },
    });
  }

  console.log('Seed concluído!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
