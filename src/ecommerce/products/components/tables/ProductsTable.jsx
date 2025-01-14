import {useEffect, useState} from "react";

//Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {getAllProducts} from "../../services/remote/get/getAllProducts";
import { getProduct } from "../../services/remote/get/getOneProduct";

// // Modals
import AddProduct  from "../modales/productos/addProduct";
// import OrdenesModal from "../modals/patchModals/OrdenesModal.jsx";
// import OrdenesDetailsModal   from "../modals/detailsModals/OrdenesDetailsModal.jsx";

// Columns Table Definition.
const columns = [
    {
        accessorKey: "IdProdServOK",
        header: "ID OK",
        size: 30, //small column
    },
    {
        accessorKey: "IdProdServBK",
        header: "ID BK",
        size: 30, //small column
    },
    {
        accessorKey: "DesProdServ",
        header: "PRODUCTO",
        size: 150, //small column
    },
    {
        accessorKey: "CodigoBarras",
        header: "COD BARRAS",
        size: 30, //small column
    },
    {
        accessorKey: "Indice",
        header: "CATEGORIA",
        size: 150, //small column
    },
    {
        accessorKey: "IdInstitutoOK",
        header: "ID OK SUP",
        size: 30, //small column
    },
  ];
   

// // Import reutilizables
// import {
//     showMensajeConfirm,
//     showMensajeError,
// } from "../../../../share/components/elements/messages/MySwalAlerts";

// Table - FrontEnd.
const ProductsTable = ({setDatosSeleccionados, datosSeleccionados}) => {

    // controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    // controlar el estado de la data.
    const [productsData, setProductsData] = useState([]);

    // // Controlar el estado que muestra u oculta la modal de nueva orden
    const [AddProductShowModal, setAddProductShowModal] = useState(false);

    // // Controlador para mostra modal detalles
    const [OrdenesDetailsShowModal, setOrdenesDetailsShowModal] = useState(false);

    // // Actualizar un subdocumento
    const [PatchOrdenesShowModal, setPatchOrdenesShowModal] = useState(false);

    // // Guardar los datos seleccionados en el estado
    const [dataRow, setDataRow] = useState();;

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        
        setDataRow(rowData.original);

        const {IdInstitutoOK, IdProdServOK,  IdProdServBK} = rowData.original;
        
        setDatosSeleccionados({IdInstitutoOK, IdProdServOK,  IdProdServBK});
    };

    async function fetchData() {
        try {
            // Obtener los datos
            const productsData = await getAllProducts();
            setProductsData(productsData);

            // Cambiar el estado del indicador (loading) a false.
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la data en useEffect: ", error);
        }
    }

    // //Para funcion Ordenes Delete en Tabla Ordenes
    // const handleDelete = async () => {
    //     const res = await showMensajeConfirm(
    //         `La Orden con el ID: ${
    //             (datosSeleccionados.IdOrdenOK)
    //         } será eliminada, ¿Desea continuar?`
    //     );
    //     if (res) {
    //         try {
    //             let {IdInstitutoOK, IdNegocioOK, IdOrdenOK} = datosSeleccionados;
    //             //const indexToDelete = idRowSel;
    //             //orden.splice(indexToDelete, 1);
    //             await DelOneOrder(IdInstitutoOK, IdNegocioOK, IdOrdenOK);
    //             /*const dataToUpdate = {
    //               cat_prod_serv_info_ad: orden,
    //             };

    //             await updateProduct(productSel.IdProdServOK, dataToUpdate);*/
    //             showMensajeConfirm("Orden eliminada con exito");
    //             fetchData();
    //         } catch (e) {
    //             console.error("handleDelete", e);
    //             showMensajeError(`No se pudo Eliminar la orden`);
    //         }
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, []);

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
                                            onClick={() => setAddProductShowModal(true)}   
                                        >
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            // onClick={() => setPatchOrdenesShowModal(true)}
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
                                            // onClick={()=> setOrdenesDetailsShowModal(true)}
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
                <Dialog open={AddProductShowModal}>
                <AddProduct
                  AddProductShowModal={AddProductShowModal}
                  setAddProductShowModal={setAddProductShowModal}
                  onClose = {async ()=>{
                    setAddProductShowModal(false);
                    const newProducts = await getAllProducts();
                    setProductsData(newProducts);
                  }
                }/>
              </Dialog>
                {/* <Dialog open={PatchOrdenesShowModal}>
                    <OrdenesModal
                        PatchOrdenesShowModal={PatchOrdenesShowModal}
                        setPatchOrdenesShowModal={setPatchOrdenesShowModal}
                        dataRow={dataRow}
                        onClose={() => {
                            setPatchOrdenesShowModal(false);
                        }}
                        fetchData={fetchData}
                    />
                </Dialog>
                <Dialog open={OrdenesDetailsShowModal}>
                    <OrdenesDetailsModal
                        OrdenesDetailsShowModal={OrdenesDetailsShowModal}
                        setOrdenesDetailsShowModal={setOrdenesDetailsShowModal}
                        dataRow={dataRow}
                        onClose={() => {
                            setOrdenesDetailsShowModal(false);
                        }}
                    />
                </Dialog> */}
            </Box>
        </Box>
    );
};

export default ProductsTable;