import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";

const PORT = env.PORT || 3000;

try {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Servidor escuchando peticiones en el puerto: ${PORT}`);
    });
} catch (error) {
    console.error("No se pudo iniciar el servidor");
    process.exit(1);
}
