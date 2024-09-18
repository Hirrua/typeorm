import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/ErrorExtention";
import userShemaValidation from "../utils/validations/schemaValidation";
import { ValidationErrorItem } from "joi";

class UserRepository {

    private static usersRepository = AppDataSource.getRepository(User)

    static async getUsers(): Promise<IUser[]> {
        return this.usersRepository.find()
    }

    static async newUser(user: IUser): Promise<IUser> {
        const { error } = userShemaValidation.validate(user, { abortEarly: false })
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
            throw new ErrorExtention(400, validationError.join(","))
        }

        const createUser = await this.usersRepository.save(user)
        return createUser
    }

    static async getUser(id: number): Promise<IUser | null> {
        const user = await this.usersRepository.findOneBy({ id })

        if (!user) {
            throw new ErrorExtention(404, "User not found")
        }

        return user
    }

    static async updateUser(id: number, user: IUser): Promise<string> {

        const { error } = userShemaValidation.validate(user, { abortEarly: false }) // Validação sincrona do schema (abortEarly -> mostra todos os erros)
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message) // Pega as mensagens do erro
            throw new ErrorExtention(400, validationError.join(",")) // Lança todos os erros capturados, separados por virgula
        }

        const userExist = await this.usersRepository.findOneBy({ id })
        if (!userExist) {
            throw new ErrorExtention(404, "User not found")
        }

        await this.usersRepository.update(id, user)
        return "User was updated!"
    }

    static async deleteUser(id: number): Promise<string> {
        const userExist = await this.usersRepository.findOneBy({ id })
        if (!userExist) {
            throw new ErrorExtention(404, "User not found")
        }

        await this.usersRepository.delete(id)
        return "User was deleted!"
    }
}

export default UserRepository