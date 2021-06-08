import { compare, hash } from 'bcrypt';

// hashear una contraseña
export const hashPass = async (pass: string) => await hash(pass, 10);

//comparar una contraseña con su posible hash
export const comparePass = async (pass: string, hash: string) =>
  await compare(pass, hash);
