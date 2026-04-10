import { Router } from "express"
import { getUsers, getUser, postUsers, putUser, delUser } from "../controllers/users.controller.js"

const router = Router()

router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.post("/users", postUsers)
router.put("/users/:id", putUser)
router.delete("/users/:id", delUser)

export default router
