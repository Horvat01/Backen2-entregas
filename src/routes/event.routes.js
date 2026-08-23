import { Router } from "express";
import { EventModel } from "../models/event.model.js"

const routes = Router()

router.get('/', async (req, res) => {
    try {
        res.json({ message: await EventModel.find({}) })
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener eventos' })
    }
})

router.post('/', async (req, res) => {
    try {
        res.json({ message: 'Evento Creado' })
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el eventos' })
    }
})

export default router