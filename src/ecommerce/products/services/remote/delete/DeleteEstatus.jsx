import axios from "axios";

export function DeleteEstatus(productId, tipoID) {
  return new Promise((resolve, reject) => {
    // Registro del objeto EstatusData para depuración
    console.log("Product Estatus delete: ", productId);
    console.log("Product tipoID delete: ", tipoID);
    // Cambia la URL para usar el productId dinámicamente
    const url = `${import.meta.env.VITE_REST_API_PRODUCT_PUT}/producto/${productId}/${tipoID}`;
    console.log("url: ", url);
    // Realizamos la solicitud PUT usando axios
    axios.delete(url)
      .then((response) => {
        const data = response.data;

        // Verificamos si la respuesta contiene los datos esperados
        if (!data) {
          console.error("No se pudo realizar correctamente la petición DeleteEstatus():", data);
          reject("No se recibieron datos de respuesta.");
        } else {
          console.log("Estatus actualizado exitosamente:", data);
          resolve(data);  // Resolvemos la promesa con los datos de la respuesta
        }
      })
      .catch((error) => {
        // Manejo detallado de errores
        if (error.response) {
          console.error("Detalles del error en DeleteEstatus():", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else {
          console.error("Error en DeleteEstatus():", error.message);
        }
        reject(error);  // Rechazamos la promesa si hay un error
      });
  });
}