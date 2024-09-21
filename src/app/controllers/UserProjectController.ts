import { Request, Response, Router } from "express";
import UserProjectRepository from "../repositories/UserProjectRepository";

class UserProjectController {
    public router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllUserProjects)
        this.router.post('/', this.createUserProject)
        this.router.put('/:id', this.updateUserProject)
        this.router.delete('/:id', this.removeUserProject)
        this.router.post('/createAll', this.createAll)
    }

    private async getAllUserProjects(req: Request, res: Response) {
        const project = await UserProjectRepository.getUserProject()
        res.status(200).json(project)
    }

    private async createUserProject(req: Request, res: Response) {
        const userProjectCreate = await UserProjectRepository.newUserProject(req.body)
        res.status(201).json(userProjectCreate)
    }

    private async updateUserProject(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const userProjectUpdate = await UserProjectRepository.updateUserProject(id, req.body)
        res.status(201).json(userProjectUpdate)
    }

    private async removeUserProject(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const projectDelete = await UserProjectRepository.deletUsereProject(id)
        res.status(201).json({ message: projectDelete })
    }

    private async createAll(req: Request, res: Response) {
        const all = await UserProjectRepository.createAll(req.body)
        res.status(201).json(all)
    }
}

const userProjectRouter = new UserProjectController().router

export default userProjectRouter