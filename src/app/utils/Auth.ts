import jwt, { SignOptions } from "jsonwebtoken"
import dotenv from "dotenv"
import { ITokenData } from "../../interfaces/ILogin"
import ErrorExtention from "../ErrorExtention"

dotenv.config()

const secret = process.env.SECRET_KEY as string
const jwtDefaultConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h"
}

class Auth {
    constructor(private jwtConfig?: SignOptions) {
        if (!jwtConfig) {
            this.jwtConfig = jwtDefaultConfig
        }
    }

    public JwtGenerator(paylod: ITokenData) {
        return jwt.sign(paylod, secret, this.jwtConfig)
    }

    public AuthenticateToken(token: string) {
        if (!token) {
            throw new ErrorExtention(404, "Token not found!")
        }

        try {
            const validateJWT = jwt.verify(token, secret, this.jwtConfig)
            return validateJWT
        } catch (err) {
            throw new ErrorExtention(400, "Authentication failed")
        }
    }
}

export default Auth