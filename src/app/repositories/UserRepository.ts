import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

class UserRepository {

    private static usersRepository = AppDataSource.getRepository(User)

    static async getUsers() {
        return this.usersRepository.find()
    }
}

export default UserRepository