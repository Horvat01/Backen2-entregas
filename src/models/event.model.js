import { Schema, model } from 'mongoose';
import { title } from 'node:process';

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo del evento es obligatorio'],
        trim: true,
    },
    destiption: {
        type: String,
        required: [true, 'La descripcion es obligatorio'],
        trim: true,
    }
},
    {
        timestamps: true
    });

export default EventModel = model('events', eventSchema);