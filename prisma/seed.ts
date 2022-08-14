import { PrismaClient } from '@prisma/client';

const users = [
  {
    email: 'althafdemiandra@gmail.com',
    firstName: 'Althaf',
    lastName: 'Demiandra',
    userName: 'varkas',
  },
  {
    email: 'gobee@gmail.com',
    firstName: 'Gabi',
    lastName: 'Reiner',
    userName: 'gabirein',
  },
  {
    email: 'Dinda@gmail.com',
    firstName: 'Dinda',
    lastName: 'Zahra',
    userName: 'mocha',
  },
];

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({ data: users });
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
