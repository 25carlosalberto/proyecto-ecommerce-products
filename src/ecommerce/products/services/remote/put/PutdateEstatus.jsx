import axios from "axios";

export function updateEstatus(productId, EstatusData) {
  return new Promise((resolve, reject) => {
    // Registro del objeto EstatusData para depuración
    console.log("Product Estatus put: ", productId);
    
    // Cambia la URL para usar el productId dinámicamente
    const url = `${import.meta.env.VITE_REST_API_PRODUCT_PUT}/producto/${productId}/estatus`;

    // Realizamos la solicitud PUT usando axios
    axios.put(url, EstatusData)
      .then((response) => {
        const data = response.data;

        // Verificamos si la respuesta contiene los datos esperados
        if (!data) {
          console.error("No se pudo realizar correctamente la petición UpdateEstatus():", data);
          reject("No se recibieron datos de respuesta.");
        } else {
          console.log("Estatus actualizado exitosamente:", data);
          resolve(data);  // Resolvemos la promesa con los datos de la respuesta
        }
      })
      .catch((error) => {
        // Manejo detallado de errores
        if (error.response) {
          console.error("Detalles del error en UpdateEstatus():", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else {
          console.error("Error en UpdateEstatus():", error.message);
        }
        reject(error);  // Rechazamos la promesa si hay un error
      });
  });
}