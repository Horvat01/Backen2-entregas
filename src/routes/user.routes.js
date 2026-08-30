import { Router } from "express";
import { EventModel } from "../models/event.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.json({ message: await EventModel.find({}) });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener Usuario' });
    }
});

router.post('/', async (req, res) => {
    try {
        res.json({ message: 'Usuario creado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el Usuario' });
    }
});

export default router;