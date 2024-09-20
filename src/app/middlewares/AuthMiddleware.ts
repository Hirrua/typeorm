import { Request, Response, NextFunction } from "express";
import Auth from "../utils/Auth"

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || ""
    const tokenGenerate = new Auth()
    tokenGenerate.AuthenticateToken(token)

    next()
}

export default authenticationMiddleware