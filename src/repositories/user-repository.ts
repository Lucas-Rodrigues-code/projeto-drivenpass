import prisma from "../database/database.js";

async function create(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password
    }
  });
}

async function findByEmail(email: string) {
  const emailUser = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      email: true,
      password: true
    },
  })
  return emailUser
}

export const userRepository = {
  create,
  findByEmail
};