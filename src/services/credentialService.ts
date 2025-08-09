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

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAllByUserId(userId);
  return credentials.map(c => ({
    ...c,
    password: cryptr.decrypt(c.password)
  }));
}

export async function getCredentialById(id: number, userId: number) {
  const credential = await credentialRepository.findByIdAndUserId(id, userId);
  if (!credential) throw { type: 'not_found', message: 'Credential not found' };

  return {
    ...credential,
    password: cryptr.decrypt(credential.password)
  };
}

export async function updateCredential(
  id: number,
  userId: number,
  data: Omit<credentialRepository.CreateCredentialData, 'userId'>
): Promise<void> {
  const credential = await credentialRepository.findByIdAndUserId(id, userId);
  if (!credential) throw { type: 'not_found', message: 'Credential not found' };

  const encryptedPassword = cryptr.encrypt(data.password);

  await credentialRepository.updateCredential(id, userId, {
    ...data,
    password: encryptedPassword
  });
}

export async function deleteCredential(id: number, userId: number): Promise<void> {
  const credential = await credentialRepository.findByIdAndUserId(id, userId);
  if (!credential) throw { type: 'not_found', message: 'Credential not found' };

  await credentialRepository.deleteCredential(id, userId);
}

export async function eraseUserData(userId: number): Promise<void> {
  await credentialRepository.deleteAllByUserId(userId);
}
