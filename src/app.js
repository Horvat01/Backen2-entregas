
import express from "express";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api", ticketRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "success", data: "ok" });
});

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada"
    });
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || error.status || 500;

    return res.status(statusCode >= 400 && statusCode <= 599 ? statusCode : 500).json({
        status: "error",
        message: statusCode >= 500
            ? "Error interno del servidor"
            : error.message
    });
});

export default app;
