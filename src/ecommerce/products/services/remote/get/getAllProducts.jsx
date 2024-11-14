import axios from "axios";

export function getAllProducts() {
    return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_API_PRODUCTOS_URL)
        .then((response) => {
          const data = response.data;
  
          if (!data) {
            console.error("No se pudo realizar correctamente la petición <<getAllProducts - Services>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_productos>>");
            resolve([]);
          } else {
            const ProductsData = data;
            console.log("Colección: <<cat_productos>>", ProductsData);
            resolve(JSON.parse(JSON.stringify(ProductsData))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllProducts - Services>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }