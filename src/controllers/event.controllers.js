import { EventModel } from "../models/event.model.js"
import { createEventService } from "../services/event.services.js"


export const getEvents = async (req, res) => {
    try {
        res.status(200).json({
            message: "ok",
            data: await EventModel.find({})
        })
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener eventos'
        })
    }
}

export const createEvent = async (req, res) => {
    try {

        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).json({ error: 'Datos de entrada insuficientes' })
        }
        const newEvent = await createEventService(title, description, req.user);
        // const event = await EventModel.create(req.body)

        res.status(201).json({
            message: "Evento creado",
            data: newEvent
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Error al crear el evento'
        })
    }
}
export const updateEvent = async (req, res) => {
    try {

        // const { title, description } = req.body
        // if (!title || !description) {
        //     return res.status(400).json({ error: 'Datos de entrada insuficientes' })
        // }
        // const newEvent = await createEventService(title, description, req.user);
        // // const event = await EventModel.create(req.body)

        // res.status(201).json({
        //     message: "Evento creado",
        //     data: newEvent
        // })
        res.status(200).json({ message: "Evento creado", data: req.event })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Error al crear el evento'
        })
    }
}