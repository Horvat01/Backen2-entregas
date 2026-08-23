import { Router } from "express";
import { EventModel } from "../models/event.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.json({ message: await EventModel.find({}) });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
});

router.post('/', async (req, res) => {
    try {
        res.json({ message: 'Evento creado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el evento' });
    }
});

export default router;