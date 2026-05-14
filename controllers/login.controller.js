import User from "../models/user.models.js"
import { verifyPassword } from "../utils/hash.js"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ login: false, msg: "Usuario no encontrado", user: {} })
        if (verifyPassword(password, user.password)) {
            res.json({ login: true, msg: "Ok", user })
        } else {
            res.status(401).json({ login: false, msg: "Contraseña incorrecta", user: {} })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
