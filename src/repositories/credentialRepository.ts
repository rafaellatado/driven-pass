import { prisma } from '../config/database';

export interface CreateCredentialData {
  title: string;
  url: string;
  username: string;
  password: string;
  userId: number;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return prisma.credential.findFirst({
    where: { title, userId }
  });
}

export async function createCredential(data: CreateCredentialData) {
  return prisma.credential.create({ data });
}

export async function findAllByUserId(userId: number) {
  return prisma.credential.findMany({
    where: { userId }
  });
}

export async function findByIdAndUserId(id: number, userId: number) {
  return prisma.credential.findFirst({
    where: { id, userId }
  });
}
