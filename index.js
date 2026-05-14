import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import connectDB from "./utils/db.js"

import indexRoutes from "./routes/index.routes.js"
import usersRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }))
app.use(morgan("dev"))
app.use(express.json())

// Rutas
app.use(indexRoutes)
app.use(usersRoutes)
app.use(loginRoutes)

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

// Conexión a la base de datos
connectDB()
