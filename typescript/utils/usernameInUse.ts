import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

// function that gonna see if the username is alredy in use
export default async function usernameInUse(username: string) {
  // search for the username in the table 'users
  const user = await getRepository(User).findOne({ username });

  // if the 'user' exist, this means that the username is in use
  if (user) {
    throw new Error("Username alredy in use");
  }
}
