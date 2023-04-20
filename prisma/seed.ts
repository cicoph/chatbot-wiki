import { PrismaClient, Prisma } from '@prisma/client'
import sha256 from "crypto-js/sha256"

const prisma = new PrismaClient()
const hashPassword = (password: string) => {
  return sha256(password).toString();
};

const userData = [
  {
    name: 'Francesco',
    email: 'francescoloddo@gmail.com',
    password: hashPassword('@Assist2023')
  }
]



async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })