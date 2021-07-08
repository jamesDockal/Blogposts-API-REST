import { hash } from "bcrypt";

// hash the 'password' using bcrypt with 8 salt
export default async function hashPassword(password: string) {
  return await hash(password, 8);
}
