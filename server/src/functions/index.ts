import { compare, hash } from 'bcrypt';

export const hashPass = async (pass: string) => await hash(pass, 10);

export const comparePass = async (pass: string, hash: string) => await compare(pass, hash);
