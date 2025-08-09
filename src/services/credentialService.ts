import * as credentialRepository from '../repositories/credentialRepository';
import Cryptr from 'cryptr';

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}

const cryptr = new Cryptr(getEnvVar('CRYPTR_SECRET'));

export async function createCredential(data: credentialRepository.CreateCredentialData): Promise<void> {
  const existing = await credentialRepository.findByTitleAndUserId(data.title, data.userId);
  if (existing) throw { type: 'conflict', message: 'Title already exists for this user' };

  const encryptedPassword = cryptr.encrypt(data.password);

  await credentialRepository.createCredential({
    ...data,
    password: encryptedPassword,
  });
}
