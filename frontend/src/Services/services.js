const API_URL = import.meta.env.VITE_API_URL

export const ObtenerProductos = async() =>{
    try {
        console.log("hola, se obtuvo el producto")
        const response = await
        fetch(`${API_URL}/producto`);
        if(!response.ok){
            console.log("hubo un error");
        }
        const datos = await response.json()
        return datos;
    } catch (error) {
        console.log("no se pudo obtener productos", error )
        throw error;
    }
};


export const getProductoXId = async(id) => {
    try {
        console.log('Llamando a getProductoXId con id:');
        const response = await 
        fetch(`${API_URL}/producto/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        const datos = await response.json();
        console.log('Datos del producto recibidos:', datos);
        return datos;
      } catch (error) {
        console.error('Error en getProductoXId:', error);
        throw error;
      }
}

export const getProductoNombre = async() => {
    const response = await fetch(`${API_URL}/buscar/${nombre}`);
    return await response.json();
}


export const postProducto = async(productoDatos) => {
    try {
        console.log('Datos a enviar en postProducto:', productoDatos);
        const response = await fetch(`${API_URL}/producto`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoDatos),
        });
        
        // Agregar log de la respuesta completa
        console.log('Respuesta completa:', response);
        
        // Obtener el texto de la respuesta antes de intentar parsearlo como JSON
        const responseText = await response.text();
        console.log('Respuesta texto:', responseText);
        
        if (!response.ok) {
          throw new Error(`Error al crear el producto: ${response.status} ${responseText}`);
        }
        
        // Solo intentar parsear como JSON si hay contenido
        const datos = responseText ? JSON.parse(responseText) : null;
        console.log('Respuesta de postProducto parseada:', datos);
        return datos;
    } catch (error) {
        console.error('Error detallado en postProducto:', {
            message: error.message,
            stack: error.stack,
            datos: productoDatos
        });
        throw error;
    }
};


export const patchProducto = async (productoDatos) => {
    try {
        console.log('Actualizando producto con id:', id);
        console.log('Datos a actualizar:', productoDatos);
        const response = await fetch(`${API_URL}/producto/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoDatos),
        });
        if (!response.ok) {
          throw new Error('Error al actualizar el producto');
        }
        const datos = await response.json();
        console.log('Respuesta de patchProducto:', datos);
        return datos;
      } catch (error) {
        console.error('Error en patchProducto:', error);
        throw error;
      }
}


export const inactivarProducto = async () => {
    const response = await fetch(`${API_URL}/producto/${id}/inactivar`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
}


export const deleteProducto = async() => {
    try {
        const response = await fetch(`${API_URL}/producto/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        return await response.json();
      } catch (error) {
        console.error('Error en deleteProducto:', error);
        throw error;
      }
}

