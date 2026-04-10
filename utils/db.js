import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado a MongoDB")
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message)
        console.warn("Servidor corriendo sin base de datos. Las rutas /users y /login no funcionarán.")
    }
}

export default connectDB
