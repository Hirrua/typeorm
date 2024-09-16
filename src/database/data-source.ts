import "reflect-metadata"
import { DataSource } from "typeorm" // Metodo que vai dizer as credencias para se conectar no banco de dados
import { CreateUsersTable1726242370576 } from "./migrations/1726242370576-CreateUsersTable"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "root",
    database: "typeorm",
    synchronize: true, // Somente usado em ambiente de desenvolvimento (true)
    logging: false,
    entities: [],
    migrations: [CreateUsersTable1726242370576],
    subscribers: []
})