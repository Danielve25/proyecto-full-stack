// Importación de mongoose para el modelado de datos
import mongoose from "mongoose";

// Definición del esquema de la receta
const ProductoSchema = new mongoose.Schema({
  // Nombre de la receta
  Producto: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  //precio
  precio:{
    type: Number,
    required: true,
    default: "0",
  },
  // Estado del producto (Activa/Inactiva)
  estado: {
    type: String,
    default: 'Activa',
  },
  // URL de la imagen del producto
  imagenUrl: {
    type: String,
    required: false,
    default: '',
  },
  // Categoría del producto (postre, torta, nevado, etc)
  categoria: {
    type: String,
    default: "",
  },
  porciones: {
    type: Number,
    required: 'false',
  },
  // Fecha de creación de el producto
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  dataCategory:{
    type: String,
  },
});

// Creación y exportación del modelo
const Producto = mongoose.model("Producto", ProductoSchema);
export default Producto;
