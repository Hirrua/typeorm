import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm" // Metodo que vai dizer as credencias para se conectar no banco de dados
import User from "../app/entities/User"
import { CreateUsersTable1726242370576 } from "./migrations/1726242370576-CreateUsersTable"
import { CreateSeedUsersTable1726501538006 } from "./migrations/1726501538006-CreateSeedUsersTable"
import { CreateProjectTable1726846806548 } from "./migrations/1726846806548-CreateProjectTable"
import { CreateUsersProjectsTable1726846819499 } from "./migrations/1726846819499-CreateUsersProjectsTable"
import { CreateAdressTable1726841022585 } from "./migrations/1726841022585-CreateAdressTable"
import Address from "../app/entities/Address"
import Project from "../app/entities/Project"
import UserProject from "../app/entities/UserProject"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true,
    synchronize: true, // Somente usado em ambiente de desenvolvimento (true)
    logging: false,
    entities: [User, Address, Project, UserProject],
    migrations: [CreateUsersTable1726242370576, CreateSeedUsersTable1726501538006, CreateAdressTable1726841022585, CreateProjectTable1726846806548,CreateUsersProjectsTable1726846819499],
    subscribers: []
})