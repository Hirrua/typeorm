import { ValidationErrorItem } from "joi";
import Project from "../entities/Project";
import { AppDataSource } from "../../database/data-source";
import ErrorExtention from "../utils/ErrorExtention";
import projectSchemaValidation from "../utils/validations/projectSchemaValidation";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";

class ProjectRepository {
    private static projectRepository = AppDataSource.getRepository(Project)

    static async getProject(): Promise<IProjectOutput[]> {
        return this.projectRepository.find()
    }

    static async newProject(project: IProjectInput): Promise<IProjectOutput> {
        const { error } = projectSchemaValidation.validate(project, { abortEarly: false })
        if (error) {
            const validationError = error.details.map((detail: ValidationErrorItem) => detail.message)
            throw new ErrorExtention(400, validationError.join(","))
        }

        const createProject = await this.projectRepository.save(project)
        return createProject
    }

    static async deleteProject(id: number): Promise<string> {
        await this.projectRepository.delete(id)
        return "Project was deleted"
    }
}

export default ProjectRepository