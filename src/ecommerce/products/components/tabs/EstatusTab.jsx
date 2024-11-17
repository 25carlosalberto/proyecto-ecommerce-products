import {Box} from "@mui/material";
import EstatusTable from "../tables/EstatusTable.jsx";

export default function EstatusTab({datosSeleccionados, setDatosSeleccionados}) {
    
    return (
        <Box>
            <EstatusTable
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}        
            />
        </Box>
    );
}