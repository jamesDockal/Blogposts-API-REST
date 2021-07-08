import { hash } from "bcrypt";

export default async function hashPassword(password: string) {
  return await hash(password, 8);
}
