import { Request, Response, Router } from "express";
import ProjectRepository from "../repositories/ProjectRepository";

class ProjectController {
    public router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllProjects)
        this.router.post('/', this.createProject)
        this.router.delete('/:id', this.removeProject)
    }

    private async getAllProjects(req: Request, res: Response) {
        const project = await ProjectRepository.getProject()
        res.status(200).json(project)
    }

    private async createProject(req: Request, res: Response) {
        const projectCreate = await ProjectRepository.newProject(req.body)
        res.status(201).json(projectCreate)
    }

    private async removeProject(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const projectDelete = await ProjectRepository.deleteProject(id)
        res.status(201).json({ message: projectDelete })
    }
}

const projectRouter = new ProjectController().router

export default projectRouter