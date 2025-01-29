import Producto from '../models/producto.model.js';

const getProducto = async (req, res) => {
  try {
    const producto = await Producto.find();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProducto = async (req, res) => {
  try {
    const newProducto = new Producto(req.body);
    const savedProducto = await newProducto.save();
    res.status(201).json(savedProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductoXId = async (req, res) => {
  try {
    const Producto = await Producto.findById(req.params.id);
    if (!Producto) {
      return res.status(404).json({ mensaje: "Producto no encontrada" });
    }
    res.json(Producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductoNombre = async (req, res) => {
  try {
    const nombre = req.params.nombre; 
    const producto = await Producto.find({ nombre: { $regex: nombre, $options: "i" } }); 

    if (!producto || producto.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron producto con ese nombre" });
    }

    res.json(producto); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchProducto = async (req, res) => {
  try {
    const ProductoActualizada = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ProductoActualizada) {
      return res.status(404).json({ mensaje: "Producto no encontrada" });
    }
    res.json(ProductoActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const inactivarProducto = async (req, res) => {
  try {
    const ProductoInactiva = await Producto.findByIdAndUpdate(
      req.params.id,
      { estado: "Inactiva" },
      { new: true }
    );
    if (!ProductoInactiva) {
      return res.status(404).json({ mensaje: "Producto no encontrada" });
    }
    res.json({ mensaje: "Producto inactivada", Producto: ProductoInactiva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const ProductoEliminada = await Producto.findByIdAndDelete(req.params.id);
    if (!ProductoEliminada) {
      return res.status(404).json({ mensaje: "Producto no encontrada" });
    }
    res.json({
      mensaje: "Producto eliminada de manera correcta",
      Producto: ProductoEliminada,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getProducto,
  postProducto,
  getProductoXId,
  getProductoNombre,
  patchProducto,
  inactivarProducto,
  deleteProducto,
};
