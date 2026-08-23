import { Router } from "express";
import { EventModel } from "../models/event.model.js"

const routes = Router()

router.get('/', async (req, res) => {
    try {
        res.json({ message: await UserModel.find({}) })
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' })
    }
})

router.post('/', async (req, res) => {
    try {
        res.json({ message: 'Usuario Creado' })
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
})

export default router