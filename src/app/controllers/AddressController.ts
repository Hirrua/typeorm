import { Request, Response, Router } from "express";
import AddressRepository from "../repositories/AddressRepository";

class AddressController {
    public router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllAddress)
        this.router.post('/', this.createAddress)
        this.router.delete('/:id', this.removeAddress)
    }

    private async getAllAddress(req: Request, res: Response) {
        const address = await AddressRepository.getAddress()
        res.status(200).json(address)
    }

    private async createAddress(req: Request, res: Response) {
        const addressCreate = await AddressRepository.newAddress(req.body)
        res.status(201).json(addressCreate)
    }

    private async removeAddress(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const addressDelete = await AddressRepository.deleteAddress(id)
        res.status(201).json({ message: addressDelete })
    }
}

const addressRouter = new AddressController().router

export default addressRouter