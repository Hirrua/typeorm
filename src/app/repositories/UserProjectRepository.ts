import { ValidationErrorItem } from "joi";
import UserProject from "../entities/UserProject";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/ErrorExtention";
import userProjectSchemaValidation from "../utils/validations/usersProjectSchemaValidation";
import { IUserProjectInput, IUserProjectOutput } from "../interfaces/IUserProjetc";
import IUser from "../interfaces/IUser";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";
import User from "../entities/User";
import Project from "../entities/Project";

class UserProjectRepository {
    private static userProjectRepository = AppDataSource.getRepository(UserProject)

    static async getUserProject(): Promise<IUserProjectOutput[]> {
        return this.userProjectRepository.find()
    }

    static async newUserProject(user_project: IUserProjectInput): Promise<IUserProjectOutput> {
        const { error } = userProjectSchemaValidation.validate(user_project, { abortEarly: false })
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
            throw new ErrorExtention(400, validationError.join(","))
        }

        const createUserProject = await this.userProjectRepository.save(user_project)
        return createUserProject
    }

    static async updateUserProject(id: number, user_project: IUserProjectInput): Promise<string> {
        const userProjectData = await this.userProjectRepository.findOneBy({ id })
        if (!userProjectData) {
            throw new ErrorExtention(404, "Not found")
        }

        await this.userProjectRepository.update(id, user_project)
        return "Was Updated"
    }

    static async deletUsereProject(id: number): Promise<string> {
        await this.userProjectRepository.delete(id)
        return "Was Deleted"
    }

    // Transação
    static async createAll(data: {
        user: IUser,
        project: IProjectInput,
        user_project: IUserProjectInput
    }): Promise<{
        user: IUser,
        project: IProjectOutput,
        user_project: IUserProjectOutput
    }> {

        const { user, project, user_project } = data
        const createAllData = await AppDataSource.transaction(async(transactionalEntityManager) => { // Possibilita operações nas transactions

            const userData = await transactionalEntityManager.save(User, user)
            const projectData = await transactionalEntityManager.save(Project, project)
            const userProjectData = await transactionalEntityManager.save(UserProject, {
                horas_trabalhada: user_project.horas_trabalhada,
                user_id: userData.id,
                project_id: projectData.id
            })

            return { user: userData, project: projectData, user_project: userProjectData }
        })

        return createAllData
    }
}

export default UserProjectRepository