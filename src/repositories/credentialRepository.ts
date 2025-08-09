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
