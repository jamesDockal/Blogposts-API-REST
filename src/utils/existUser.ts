import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

export default async function existUsers(username: string) {
  const user = await getRepository(User).findOne({ username });
  if (user) {
    throw new Error("Username alredy in use");
  }
}
