import * as userRepository from '../repositories/userRepository';

export async function eraseUserData(userId: number): Promise<void> {
  await userRepository.deleteCredentialsByUserId(userId);
  await userRepository.deleteUserById(userId);
}