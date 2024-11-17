import {useEffect, useState} from "react";

//Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

// DB
import UpdateEstatusModal from "../modales/estatus/UpdateEstatus"
import { getProduct } from "../../services/remote/get/getOneProduct";

// Modals
// import OrdenesEstatusModal from "../modals/patchModals/OrdenesEstatusModal.jsx";
// import OrdenesUpdateEstatusModal from "../modals/updateModals/OrdenesUpdateEstatusModal.jsx";
// import {showMensajeConfirm, showMensajeError} from "../../../../share/components/elements/messages/MySwalAlerts.jsx";
// import {DelOneOrder} from "../../services/remote/del/DelOneOrder.jsx";
// import {UpdatePatchOneOrder} from "../../services/remote/put/UpdatePatchOneOrder.jsx";
// import {OrdenesEstatusValues} from "../../helpers/OrdenesEstatusValues.jsx";
// import OrdenesDetailsEstatusModal from "../modals/detailsModals/OrdenesDetailsEstatusModal.jsx";

// Columns Table Definition.
const columns = [
    {
        accessorKey: "IdTipoEstatusOK",
        header: "ID Tipo Estatus OK",
        size: 30, //small column
    },
    {
        accessorKey: "Actual",
        header: "Actual",
        size: 30, //small column
    },
    {
        accessorKey: "Observacion",
        header: "Observacion",
        size: 150, //small column
    },

];

// Table - FrontEnd.
const EstatusTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    const [UpdateEstatusShowModal, setUpdateEstatusShowModal] = useState(false);
    const [EstatusSel, setEstatusSel] = useState(null); // Producto seleccionado
    // controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    const [ProductSelec, setProductSel] = useState(true);
    // controlar el estado de la data.
    const [productsData, setProductsData] = useState([]);

    // controlar el estado que muesta u oculta el modal para insertar el nuevo subdocumento.
    // const [OrdenesEstatusShowModal, setOrdenesEstatusShowModal] = useState(false);

    // // controllar el estado que muestra u oculta el modal para actualizar el subdocumento.
    // const [OrdenesUpdateEstatusShowModal, setOrdenesUpdateEstatusShowModal] = useState(false);

    // // controlar el estado que muestra u oculta el modal para ver los detalles del subdocumento.
    // const [OrdenesDetailsEstatusModalShowModal, setOrdenesDetailsEstatusModalShowModal] = useState(false);
    // Controlar la informacion seleccionada
    const [dataRow, setDataRow] = useState();

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Guardar la informacion seleccionada
        setDataRow(rowData.original);
    };

    async function fetchData() {
        try {
            // Obtener los id's seleccionados
            const {IdInstitutoOK, IdProdServOK,  IdProdServBK} = datosSeleccionados;
            console.log("id Product: ",IdProdServOK);//PASA EL ID QUE NECESITAAAAS
            setProductSel(IdProdServOK);
            // Verificar si fueron seleccionados los id's; de lo contrario, no hacer nada.
            if (IdInstitutoOK === "0" || IdProdServOK === "0" || IdProdServBK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos
            const productsData = await getProduct(IdProdServOK);
            setProductsData(productsData.estatus);

            // Cambiar el estado del indicador (loading) a false.
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la data en useEffect: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Funcion par eliminar estatus órdenes
    // const handleDelete = async () => {
    //     const res = await showMensajeConfirm(
    //         `El estatus con el ID: ${
    //             (dataRow.IdTipoEstatusOK)
    //         } será eliminada, ¿Desea continuar?`
    //     );
    //     if (res) {
    //         try {
    //             // Obtener el indice de la fila seleccionada
    //             const selectedRowIndex = ordersData.findIndex((row) => row.IdTipoEstatusOK === dataRow.IdTipoEstatusOK);

    //             // Verificar si no se seleccionó ninguna fila
    //             if (selectedRowIndex === -1) {
    //                 return;
    //             }

    //             // Obtener los id's seleccionados del documento principal
    //             let {IdInstitutoOK, IdProdServOK,  IdProdServBK} = datosSeleccionados;

    //             // Obtener toda la información del documento que se quiere actualizar su subdocumento
    //             const ordenExistente = await GetOneOrder(IdInstitutoOK, IdProdServOK,  IdProdServBK);

    //             // Actualizar la información
    //             const estatusArray = [...ordenExistente.estatus];
    //             estatusArray.splice(selectedRowIndex, 1);
    //             const dataToUpdate = {
    //                 estatus: estatusArray,
    //             };

    //             // Actualizar el documento con el endpoint
    //             await UpdatePatchOneOrder?.(IdInstitutoOK, IdProdServOK,  IdProdServBK, dataToUpdate);

    //             // Mostrar mensaje de confirmación
    //             await showMensajeConfirm("Estatus eliminado con exito");

    //             // Actualizar la data
    //             await fetchData();
    //         } catch (e) {
    //             console.error("handleDelete", e);
    //             showMensajeError(`No se pudo eliminar el estatus`);
    //         }
    //     }
    // };

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={columns}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    data={productsData}
                    state={{isLoading: loadingTable}}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{m: 1}}>
                                <Box>
                                <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setUpdateEstatusShowModal(true)}
                                        >
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            onClick={() => setUpdateEstatusShowModal(true)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            // onClick={() => handleDelete()}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                        <IconButton
                                            // onClick={()=>setOrdenesDetailsEstatusModalShowModal(true)}
                                        >
                                            <InfoIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refrescar">
                                        <IconButton
                                            onClick={fetchData}>
                                            <RefreshIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
                {/* M O D A L E S */}
                {/* <Dialog open={OrdenesEstatusShowModal}>
                    <OrdenesEstatusModal
                        OrdenesEstatusShowModal={OrdenesEstatusShowModal}
                        setOrdenesEstatusShowModal={setOrdenesEstatusShowModal}
                        datosSeleccionados={datosSeleccionados}
                        onClose={() => {
                            setOrdenesEstatusShowModal(false)
                        }}
                        fetchData={fetchData}
                    />
                </Dialog>*/

                
                <Dialog open={UpdateEstatusShowModal}>
                <UpdateEstatusModal
                  IdProdServOK={ProductSelec}
                  UpdateEstatusShowModal={UpdateEstatusShowModal}
                  setUpdateEstatusShowModal={UpdateEstatusShowModal}
                  EstatusToUpdate={EstatusSel} // Pasa el producto seleccionado al modal
                  onClose={async () => {
                    setUpdateEstatusShowModal(false);
                  }}
                />
              </Dialog>
              
             
                /*<Dialog open={OrdenesDetailsEstatusModalShowModal}>
                    <OrdenesDetailsEstatusModal
                        OrdenesUpdateEstatusShowModal={OrdenesDetailsEstatusModalShowModal}
                        setOrdenesUpdateEstatusShowModal={setOrdenesDetailsEstatusModalShowModal}
                        dataRow={dataRow}
                        onClose={() => {
                            setOrdenesDetailsEstatusModalShowModal(false)
                        }}
                    />

                </Dialog> */}
            </Box>
        </Box>
    );
};

export default EstatusTable;