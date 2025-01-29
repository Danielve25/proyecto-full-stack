// Importación de dependencias necesarias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {conectDB} from "./config/bd.js";
import recetaRoutes from "./routes/receta.routes.js";

// Configuración de variables de entorno
dotenv.config();

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
conectDB();

// Configuración de rutas
app.use("/", recetaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
