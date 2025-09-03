import { prisma } from '../prisma/prisma.js';

async function main() {
  const users = [
    { nome: 'admin', email: '1234@user.com' },
    { nome: 'user', email: 'abcd@user.com' }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email }, // email é único
      update: {}, // não atualiza se já existir
      create: {
        nome: u.nome,
        email: u.email
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
