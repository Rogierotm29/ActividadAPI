import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
import { verifyPassword } from "../utils/hash.js"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ login: false, msg: "Usuario no encontrado" })

        if (!verifyPassword(password, user.password)) {
            return res.status(401).json({ login: false, msg: "Contraseña incorrecta" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )

        res.json({ login: true, msg: "Ok", token })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
