import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/index.js";
import logger from "./config/logger.js"
const PORT = config.port;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${PORT}`)
    });
  } catch (error) {
   logger.fatal(`Error al iniciar el servidor: ${error.message}`, {
      error,
    });

    process.exitCode = 1
 
  }
};

startServer();
