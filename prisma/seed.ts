import { PrismaClient } from "@prisma/client";
import users from "./seedData.json";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Database has been seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
