import {getDetailRow} from "../helpers/utils"

export function EstatusModel(){
    let Estatus = {
        IdTipoEstatusOK: { type: String },
        Actual: { type: String },
        Observacion: { type: String },
        detail_row: getDetailRow(),
    };
    return Estatus;
};