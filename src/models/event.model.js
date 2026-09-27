import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo del evento es obligatorio'],
        trim: true,
    },

    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        trim: true,

    },

    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'el Organizador es obligatorio']
    }
},

    {
        timestamps: true
    });

export const EventModel = model('events', eventSchema);