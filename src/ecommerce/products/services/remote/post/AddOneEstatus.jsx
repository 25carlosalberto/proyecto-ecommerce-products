import axios from "axios";

export function AddOneEstatus(productId,estatus){
    return new Promise((resolve, reject) => {

        // Registro del objeto EstatusData para depuración
    
        // Cambia la URL para usar el EstatusId dinámicamente
        const url = `${import.meta.env.VITE_REST_API_PRODUCT_PUT}/producto/${productId}/estatus`;
        console.log("Product Estatus Post: ", productId);
        console.log("url ", url);
        console.log("Estatus: ", estatus);
        // Realizamos la solicitud PUT usando axios
        axios.post(url, estatus)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneEstatus", estatus)
          const data = response.data;
          //console.log("<<RESPONSE>> DATA:", data);
          if (!data) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneEstatus>> de forma correcta", data);
            reject(data); 
          } else if (data) {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneEstatus>>", error);
          reject(error); 
        });     
    });
}