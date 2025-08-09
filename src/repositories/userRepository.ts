import { prisma } from '../config/database'; 

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: CreateUserData) {
  return prisma.user.create({ data });
}

export async function deleteCredentialsByUserId(userId: number): Promise<void> {
  await prisma.credential.deleteMany({ where: { userId } });
}

export async function deleteUserById(userId: number): Promise<void> {
  await prisma.user.delete({ where: { id: userId } });
}
