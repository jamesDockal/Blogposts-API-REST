import { EntityRepository, Repository } from "typeorm";
import User from "../entities/UserEntity";

// make a connection between the table user and the app
@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
