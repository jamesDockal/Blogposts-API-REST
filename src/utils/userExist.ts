import { getRepository } from "typeorm";
import User from "../entities/UserEntity";

export default async function userExist(userid: string) {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    id: userid,
  });
  // const user = "teste";
  if (user) {
    return user;
  } else {
    return false;
  }
}
