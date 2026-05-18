import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
        return res.status(401).json({ msg: "Acceso denegado: no se proporcionó token" })
    }

    const token = authHeader.split(" ")[1] // formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado: formato de token inválido" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // guarda los datos del usuario para usarlos en la ruta
        next()
    } catch (error) {
        return res.status(403).json({ msg: "Token inválido o expirado" })
    }
}

export default verifyToken
