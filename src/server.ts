import "reflect-metadata" // Trabalhar com decoradores no typeorm
import express from "express"
import "express-async-errors"
import cors from "cors" // Gerenciar acesso a API
import { AppDataSource } from "./database/data-source"
import routers from "./app/routes"
import httpErrorMiddleware from "./app/middlewares/ErrorMiddlewares"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routers)
app.use(httpErrorMiddleware)

AppDataSource.initialize().then(async() => {
    console.log("Database started")
    app.listen(3000, () => {
        console.log("Server is running http://localhost:3000")
    })
})