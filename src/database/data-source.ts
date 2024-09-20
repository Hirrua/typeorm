import "reflect-metadata"
import { DataSource } from "typeorm" // Metodo que vai dizer as credencias para se conectar no banco de dados
import User from "../app/entities/User"
import { CreateUsersTable1726242370576 } from "./migrations/1726242370576-CreateUsersTable"
import { CreateSeedUsersTable1726501538006 } from "./migrations/1726501538006-CreateSeedUsersTable"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5433,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "typeorm",
    synchronize: true, // Somente usado em ambiente de desenvolvimento (true)
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1726242370576, CreateSeedUsersTable1726501538006],
    subscribers: []
})