export class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id?.toString() ?? ticket.id?.toString();
        this.status = ticket.status;
        this.quantity = ticket.quantity;
        this.reservationCode = ticket.reservationCode;
        this.createdAt = ticket.createdAt;
        this.cancelledAt = ticket.cancelledAt ?? null;

        const event = ticket.event;

        this.event = event
            ? {
                id: event._id?.toString()
                    ?? event.id?.toString()
                    ?? event.toString(),
                ...(event.title !== undefined && { title: event.title }),
                ...(event.date !== undefined && { date: event.date }),
                ...(event.location !== undefined && { location: event.location })
            }
            : null;

        const user = ticket.user;

        this.user = user
            ? {
                id: user._id?.toString() ?? user.id?.toString() ?? user.toString(),
                ...(user.first_name !== undefined && { first_name: user.first_name }),
                ...(user.last_name !== undefined && { last_name: user.last_name }),
                ...(user.email !== undefined && { email: user.email })
            }
            : null;
    }
}