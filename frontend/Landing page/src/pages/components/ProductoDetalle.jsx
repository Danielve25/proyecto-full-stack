import { useState, useEffect } from "react";
import { useParams, useNavigate, useHref } from "react-router-dom";
import { getProductoXId } from "../../Services/services";
import "../../css/productoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await getProductoXId(id);
        if (!data) {
          throw new Error("No se encontró el producto");
        }
        console.log("producto cargado:", data);
        setproducto(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(
          "No se pudo cargar el producto. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleVolver = () => {
    navigate(-1);
  };

  const renderDescripcion = (descripcion) => {
    if (!descripcion) return null;
    return descripcion.split("\n").map((paso, index) => (
      <div key={index} className="paso-item">
        <div className="paso-numero">{index + 1}</div>
        <p className="paso-texto">{paso.trim()}</p>
      </div>
    ));
  };

  // Función para manejar la URL de la imagen
  const getImageUrl = () => {
    if (!producto) return;
    console.log("producto en detalle:", producto);
    console.log("URL de imagen en detalle:", producto.imagenUrl);
    return producto.imagenUrl && producto.imagenUrl.trim() !== ""
      ? producto.imagenUrl
      : imagenGenerica;
  };

  const handleImageError = (e) => {
    console.log("Error al cargar la imagen en detalle, usando imagen genérica");
    e.target.src = imagenGenerica;
    e.target.onerror = null; // Previene loop infinito
  };

  if (loading) {
    return (
      <div className="producto-detalle-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="producto-detalle-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={handleVolver} className="volver-btn">
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="producto-detalle-container">
        <div className="error-container">
          <p className="error-message">No se encontró el producto</p>
          <button onClick={handleVolver} className="volver-btn">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="producto-detalle-container">
      <button onClick={handleVolver} className="volver-btn">
        ← Volver
      </button>

      <div className="producto-header">
        <div className="producto-titulo-container">
          <h1>{producto.nombre}</h1>
          <span
            className={`categoria-badge ${producto.categoria
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {producto.categoria}
          </span>
        </div>
      </div>

      <div className="producto-content">
        <div className="producto-imagen-container">
          <img
            src={getImageUrl()}
            alt={producto.nombre}
            className="producto-imagen"
            onError={handleImageError}
          />
        </div>

        <section className="seccion-preparacion">
          <h2>Descripción</h2>
          <div className="pasos-lista">
            {renderDescripcion(producto.descripcion)}
          </div>
        </section>

        {producto.porciones && (
          <section className="seccion-porciones">
            <h2>Porciones</h2>
            <p>{producto.porciones}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductoDetalle;
