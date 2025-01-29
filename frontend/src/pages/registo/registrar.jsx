import { useState, useEffect } from 'react';
import {ObtenerProductos, deleteProducto, getProductoNombre,getProductoXId,inactivarProducto,patchProducto,postProducto} from './../../Services/services.js';
import '../../css/Registrar.css';

const CATEGORIAS = ['torta', 'postre', 'nevado'];
const ESTADOS = ['Activa', 'Inactiva'];

function Registrar({ productoId, onProductoRegistrado, onCancel }) {
  const [formData, setFormData] = useState({
    producto: '',
    Descripcion: '',
    dataCategory: '', 
    precio: '',
    imagenUrl: '',
    estado: 'Activa',
    porciones: '' // Estado por defecto
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    if (productoId) {
      cargarProducto();
    }
  }, [productoId]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      const data = await getProductoXId(productoId);
      if (data) {
        setFormData({
          producto: data.producto || '',
          Descripcion: data.Descripcion || '',
          dataCategory: data.dataCategory|| '',
          precio: data.precio || '',
          imagenUrl: data.imagenUrl || '',
          estado: data.estado || 'Activa',
          porciones: data.porciones ||''
        });
      }
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      mostrarMensaje('Error al cargar el producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  const validarFormulario = () => {
    if (!formData.producto.trim()) {
      mostrarMensaje('El nombre es obligatorio', 'error');
      return false;
    }
    if (!formData.precio) {
      mostrarMensaje('El precio es obligatorio', 'error');
      return false;
    }
    if (!formData.Descripcion.trim()) {
      mostrarMensaje('La Descripción es obligatorio', 'error');
      return false;
    }
    if (!formData.dataCategory) {
      mostrarMensaje('La categoría es obligatoria', 'error');
      return false;
    }
    if (!formData.estado) {
      mostrarMensaje('El estado es obligatorio', 'error');
      return false;
    }
    if (!formData.porciones.trim()) {
      mostrarMensaje('este campo es obligatorio', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        imagenUrl: formData.imagenUrl.trim() || ''
      };
      
      console.log('Datos a enviar:', dataToSend);

      if (productoId) {
        await patchProducto(productoId, dataToSend);
        mostrarMensaje('producto actualizado con éxito', 'exito');
      } else {
        const response = await postProducto(dataToSend);
        console.log('Respuesta del servidor:', response);
        mostrarMensaje('producto creado con éxito', 'exito');
      }
      
      if (onProductoRegistrado) {
        onProductoRegistrado();
      }
    } catch (error) {
      console.error('Error detallado:', error.response || error);
      mostrarMensaje('Error al guardar el producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name === 'categoria' ? 'dataCategory' : name;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  if (loading) {
    return (
      <div className="registrar-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registrar-container">
      <h2>{productoId ? 'Editar producto' : 'Nuevo Producto'}</h2>
      
      <form onSubmit={handleSubmit} className="registrar-form">
        <div className="form-group">
          <label htmlFor="producto">Nombre:</label>
          <input
            type="text"
            id="producto"
            name="producto"
            value={formData.producto}
            onChange={handleInputChange}
            placeholder="Nombre de el producto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            placeholder="Precio de el producto"
          />
        </div>



        <div className="form-group">
          <label htmlFor="porciones">Porciones:</label>
          <input
            type="text"
            id="porciones"
            name="porciones"
            value={formData.porciones}
            onChange={handleInputChange}
            placeholder="cantidad de porciones ej: 2 porciones"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.dataCategory}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una categoría</option>
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            {ESTADOS.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="Descripcion">Descripción:</label>
          <textarea
            id="Descripcion"
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleInputChange}
            placeholder="Ingrese las Descripcion paso a paso"
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagenUrl">URL de la imagen:</label>
          <input
            type="url"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleInputChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={loading}>
            {productoId ? 'Actualizar' : 'Crear'} producto
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registrar;
