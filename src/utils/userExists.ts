import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

export default async function userExists(username: string) {
  const user = await getRepository(User).findOne({ username });
  console.log("user", user);
  if (!user) {
    throw new Error("User not found");
  }
}
