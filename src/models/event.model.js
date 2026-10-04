import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
    {
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

        category: {
            type: String,
            required: [true, 'La categoria es obligatoria'],
            trim: true,
        },

        date: {
            type: Date,
            required: [true, 'La fecha del evento es obligatoria'],
        },

        location: {
            type: String,
            required: [true, 'La ubicacion es obligatoria'],
            trim: true,
        },

        capacity: {
            type: Number,
            required: [true, 'La capacidad es obligatoria'],
            min: [1, 'La capacidad debe ser mayor a 0'],
        },

        price: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo'],
        },

        status: {
            type: String,
            enum: ['draft', 'published', 'cancelled', 'finished'],
            default: 'draft',
        },

        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'El organizador es obligatorio'],
        },
    },
    {
        timestamps: true,
    }
);

export const EventModel = model('events', eventSchema);

