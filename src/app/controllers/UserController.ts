import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {

    public router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllUsers)
        this.router.post('/', this.createUser)
        this.router.get('/:id', this.getUser)
        this.router.put('/:id', this.updateUser)
        this.router.delete('/:id', this.delteUser)
    }

    private async getAllUsers(req: Request, res: Response) {
        const users = await UserRepository.getUsers()
        res.status(200).json(users)
    }

    private async createUser(req: Request, res: Response) {
        const userCreate = await UserRepository.newUser(req.body)
        res.status(201).json(userCreate)
    }

    private async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const user = await UserRepository.getUser(id)
        res.status(200).json(user)
    }

    private async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const userUpdate = await UserRepository.updateUser(id, req.body)
        res.status(201).json({ message: userUpdate })
    }

    private async delteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const userDelete = await UserRepository.deleteUser(id)
        res.status(201).json({ message: userDelete })
    }
}

const userRouter = new UserController().router

export default userRouter