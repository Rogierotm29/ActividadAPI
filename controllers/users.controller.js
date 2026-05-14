import User from "../models/user.models.js"
import { hashPassword } from "../utils/hash.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const postUsers = async (req, res) => {
    try {
        const newUser = new User({ ...req.body, password: hashPassword(req.body.password) })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const putUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const delUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" })
        res.json({ msg: "Usuario eliminado" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
