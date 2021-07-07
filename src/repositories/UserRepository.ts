import { EntityRepository, Repository } from "typeorm";
import User from "../entities/UserEntity";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
