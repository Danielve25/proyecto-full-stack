import { useState } from "react"
import { useEffect } from "react";
import {ObtenerProductos} from "../../Services/services"
import { Link } from "react-router";
import '../../css/producto.css'
function Productos () {
  const [producto,setProducto] = useState([]);
  useEffect(() =>{
    const lista = async() =>{
      try {
        const datos = await ObtenerProductos();
        console.log(datos)
        setProducto(datos)
      } catch (error) {
        console.log("no se pudo obtener productos", error )
        throw error;
      }
    }
    lista();
  },[])
  return (
    <>
      <div className="espaciado"></div>
        <div className="container">
          <section id="sitios">
            <div className="cards-container">
              {producto.map((item, index) => (
                <div className="card tarjeta">  
                  <div className="card-content" key={index}>
                    <img src={item.imagenUrl} alt="Nevado"/>
                    <h3 className="card-title">{item.producto}</h3>
                    <h2>{item.porciones}</h2>
                    <p className="card-description">{item.Descripcion}</p>
                      <div className="card-links">
                        <Link to="/contacto" className="card-btn">contactanos</Link>
                        <p className="precio">precio: {item.precio}</p>                                
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
    </>
  )
}
export default Productos