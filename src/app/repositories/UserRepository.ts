import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/ErrorExtention";
import userShemaValidation from "../utils/validations/schemaValidation";
import { ValidationErrorItem } from "joi";
import { ILogin } from "../interfaces/ILogin";
import Auth from "../utils/Auth";
import IPageOptions from "../interfaces/IPages";
// import bcrypt from "bcrypt"


class UserRepository {

    private static usersRepository = AppDataSource.getRepository(User)

    static async getUsers({ pageNumber, itensPerPage, orderBy, orderDirection }: IPageOptions ): Promise<IUser[]> {
        // Paginação (quantidade de registro por paginas)
        return this.usersRepository.find({ 
            skip: (pageNumber - 1) * itensPerPage,
            take: itensPerPage,
            order: { [orderBy]: orderDirection },

            relations: { address: true } })
    }

    static async newUser(user: IUser): Promise<IUser> {
        const { error } = userShemaValidation.validate(user, { abortEarly: false })
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
            throw new ErrorExtention(400, validationError.join(","))
        }

        // IMPLEMENTAR FUTURAMENTE
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(user.password, salt)
        // user.password = hashedPassword

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

    // AUTENTICAÇÃO
    static async getUserEmail(email: string): Promise<IUser | null> {
        return this.usersRepository.findOneBy({ email })
    }

    static async authUser(loginData: ILogin): Promise<string> {
        const { email, password } = loginData
        if (!email || !password) {
            throw new ErrorExtention(401, "Missing data")
        }

        const user = await this.getUserEmail(email)
        if (!user) {
            throw new ErrorExtention(401, "E-mail or password wrong")
        }

        // const verifyPassword = await bcrypt.compare(password, user.password)
        // if (!password !== verifyPassword) {
        //     throw new ErrorExtention(401, "E-mail or password wrong")
        // }

        const payload = { nome: user.nome, email: user.email }
        const auth = new Auth()
        const token = auth.JwtGenerator(payload)

        return token
    }
}

export default UserRepository