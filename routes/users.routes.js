import { Router } from "express"
import { getUsers, getUser, postUsers, putUser, delUser } from "../controllers/users.controller.js"
import verifyToken from "../middlewares/auth.js"

const router = Router()

// Rutas públicas
router.post("/users", postUsers)

// Rutas protegidas — requieren token JWT válido
router.get("/users", verifyToken, getUsers)
router.get("/users/:id", verifyToken, getUser)
router.put("/users/:id", verifyToken, putUser)
router.delete("/users/:id", verifyToken, delUser)

export default router
