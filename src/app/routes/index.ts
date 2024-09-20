import { Router } from "express";
import userRouter from "../controllers/UserController";
import addressRouter from "../controllers/AddressController";
import projectRouter from "../controllers/ProjectController";
import userProjectRouter from "../controllers/UserProjectController";

const routers = Router()

routers.use('/users', userRouter)
routers.use('/address', addressRouter)
routers.use('/projects', projectRouter)
routers.use('/user_projects', userProjectRouter)


export default routers