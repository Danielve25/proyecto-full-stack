import { useState, useEffect } from "react";
import { ObtenerProductos } from "../../Services/services";
import { Link } from "react-router";

function Inicio() {
    const [producto, setProducto] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    useEffect(() => {
        const lista = async () => {
            try {
                const datos = await ObtenerProductos();
                console.log(datos);
                setProducto(datos);
            } catch (error) {
                console.log("no se pudo obtener productos", error);
                throw error;
            }
        };
        lista();
    }, []);

    const handleFilterClick = (filterValue) => {
        setFiltro(filterValue);
    };

    return (
        <>
            <div className="filters">
                <button
                    className={`filter-btn ${filtro === "todos" ? "active" : ""}`}
                    onClick={() => handleFilterClick("todos")}
                >
                    Todos
                </button>
                <button
                    className={`filter-btn ${filtro === "torta" ? "active" : ""}`}
                    onClick={() => handleFilterClick("torta")}
                >
                    Tortas
                </button>
                <button
                    className={`filter-btn ${filtro === "postre" ? "active" : ""}`}
                    onClick={() => handleFilterClick("postre")}
                >
                    Postres
                </button>
                <button
                    className={`filter-btn ${filtro === "nevado" ? "active" : ""}`}
                    onClick={() => handleFilterClick("nevado")}
                >
                    Nevados
                </button>
            </div>
            <div className="container">
                <section id="sitios">
                    <div className="cards-container">
                        {producto
                            .filter((item) =>
                                filtro === "todos" ? true : item.dataCategory === filtro
                            )
                            .map((item, index) => (
                                <div key={index}>
                                    <div
                                        className="card tarjeta"
                                        data-category={item.dataCategory}
                                    >
                                        <div className="card-content">
                                            <img src={item.imagenUrl} alt="Nevado" />
                                            <h3 className="card-title">{item.producto}</h3>
                                            <h2 className="porciones">{item.porciones}</h2>
                                            <p className="card-description">{item.Descripcion}</p>
                                            <div className="card-links">
                                                <Link to="/contacto" className="card-btn">
                                                    contactanos
                                                </Link>
                                                <p className="precio">
                                                    precio: {item.precio}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Inicio;

