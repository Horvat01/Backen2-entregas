import { Schema, model } from "mongoose";

export const TICKET_STATUSES = ["confirmed", "pending", "cancelled"];

export const ACTIVE_TICKET_STATUSES = ["confirmed", "pending"];

const ticketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'EL usuario del ticket es obligatorio.']
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: [true, 'EL evento del ticket es obligatorio.']
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: "confirmed",
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, 'La cantidad debe ser al menos 1.']
    },
    reservationCode: {
        type: String,
        required: [true, 'EL codigo de reserva es obligatorio.'],
        unique: true
    },
    cancelledAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export const TicketModel = model("tickets", ticketSchema);