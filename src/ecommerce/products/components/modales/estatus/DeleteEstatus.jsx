import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle,
    Typography, TextField, DialogActions, Box, Alert,
    FormControlLabel, Checkbox
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

// nuevos imports
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusValues } from "../../../helpers/EstatusValues";
import { DeleteEstatus } from "../../../services/remote/delete/DeleteEstatus"; // API para actualizar el estatus


const DeleteEstatusModal = ({ IdProdServOK,DeleteEstatusShowModal, setDeleteEstatusShowModal, EstatusToUpdate, onClose }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: EstatusToUpdate ? EstatusToUpdate.IdTipoEstatusOK : "", // Asigna el valor inicial si existe EstatusToUpdate
        },
        validationSchema: Yup.object({
            IdTipoEstatusOK: Yup.string().required("Campo requerido")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Estatus = EstatusValues(values);
                console.log("Values: ",values, " id: ",IdProdServOK);
                // Asegúrate de que el productId esté disponible en el objeto EstatusToUpdate
                if (!IdProdServOK) {
                    throw new Error("No se encontró el ID del producto.");
                }
                console.log("ID tipo Antes de entrar de entrardate: ",Estatus.IdTipoEstatusOK);
                console.log("ID producto Antes de entrar: ",IdProdServOK);
                await DeleteEstatus(IdProdServOK,Estatus.IdTipoEstatusOK); // Llama a la API para actualizar el Estatus
                setMensajeExitoAlert("Estatus actualizado correctamente");
                onClose();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el Estatus");
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={DeleteEstatusShowModal}
            onClose={() => {
                setDeleteEstatusShowModal(false);
                onClose();
            }}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
    <Typography component="div">
        <strong>Actualizar Estatus</strong>
    </Typography>
</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdTipoEstatusOK"
                        label="IdTipoEstatusOK*"
                        value={formik.values.IdTipoEstatusOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK)}
                        helperText={formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK}
                        disabled
                    />
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {mensajeErrorAlert && (
                            <Alert severity="error">
                                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                            </Alert>
                        )}
                        {mensajeExitoAlert && (
                            <Alert severity="success">
                                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                            </Alert>
                        )}
                    </Box>
                    {/*Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => onClose()
                            // setDeleteEstatusShowModal(false);
                        }
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                    {/*Boton de Guardar. */}
                    <LoadingButton
                        color="error"
                        loadingPosition="start"
                        startIcon={<DeleteIcon  />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    //onClick={() => setDeleteInstituteShowModal(false)}
                    >
                        <span>ELIMINAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default DeleteEstatusModal;