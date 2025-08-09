import * as bcrypt from 'bcryptjs';
import * as userRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

export async function signUp(userData: userRepository.CreateUserData) {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) throw { type: 'conflict', message: 'Email already registered' };

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await userRepository.createUser({
    name: userData.name,
    email: userData.email,
    password: hashedPassword, 
  });
}

interface SignInParams {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInParams): Promise<string> {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw { type: 'not_found', message: 'Email not registered' };

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw { type: 'unauthorized', message: 'Invalid password' };

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );

  return token;
}

