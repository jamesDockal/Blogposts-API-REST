import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

// fuction gonna search for an user for the giver 'userid'
// if it was not found, it gonna return a error
export default async function userExist(userid: string) {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    id: userid,
  });

  if (!user) {
    throw new Error("invalid user_id");
  }
  return user;
}
