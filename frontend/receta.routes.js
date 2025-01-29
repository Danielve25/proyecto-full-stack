// Importación de dependencias y controladores
import express from "express";
import {
  getProducto,
  postProducto,
  getProductoXId,
  patchProducto,
  inactivarProducto,
  deleteProducto,
  getProductoNombre
} from "../controllers/producto.controller.js";

const router = express.Router();

// Definición de rutas para el CRUD de Productos
// GET - Obtener todas las Productos
router.get("/producto", getProducto);

// POST - Crear una nueva receta
router.post("/producto", postProducto);

// GET - Obtener una receta por su ID
router.get("/producto/:id", getProductoXId);

// GET - Buscar producto por nombre
router.get("/buscar/:producto", getProductoNombre);

// PATCH - Actualizar una receta
router.patch("/producto/:id", patchProducto);

// PATCH - Inactivar una receta
router.patch("/producto/:id/inactivar", inactivarProducto);

// DELETE - Eliminar una receta
router.delete("/producto/:id", deleteProducto);

export default router;
