import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle,
    Typography, TextField, DialogActions, Box, Alert,
    FormControlLabel, Checkbox
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

// nuevos imports
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusValues } from "../../../helpers/EstatusValues";
import { updateEstatus } from "../../../services/remote/put/PutdateEstatus"; // API para actualizar el estatus


const UpdateEstatusModal = ({ IdProdServOK,UpdateEstatusShowModal, setUpdateEstatusShowModal, EstatusToUpdate, onClose }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    console.log("ID producto Update: ",IdProdServOK);
    console.log("ID producto UpdateEstatusShowModal: ",UpdateEstatusShowModal);
    console.log("ID producto setUpdateEstatusShowModal: ",setUpdateEstatusShowModal);
    console.log("ID producto EstatusToUpdate: ",EstatusToUpdate);
    console.log("ID producto onClose: ",onClose);

    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: EstatusToUpdate ? EstatusToUpdate.IdTipoEstatusOK : "", // Asigna el valor inicial si existe EstatusToUpdate
            Actual:  "",  // Si no hay valor, asigna un valor vacío
            Observacion:  "",
        },
        validationSchema: Yup.object({
            IdTipoEstatusOK: Yup.string().required("Campo requerido"),
            Actual: Yup.string(),
            Observacion: Yup.string().required("Campo requerido"),
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

                await updateEstatus(IdProdServOK,Estatus); // Llama a la API para actualizar el Estatus
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
            open={UpdateEstatusShowModal}
            onClose={() => {
                setUpdateEstatusShowModal(false);
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
                    <TextField
                        id="Actual"
                        label="Actual*"
                        value={formik.values.Actual}
                        {...commonTextFieldProps}
                        error={formik.touched.Actual && Boolean(formik.errors.Actual)}
                        helperText={formik.touched.Actual && formik.errors.Actual}
                    />
                    <TextField
                        id="Observacion"
                        label="Observacion*"
                        value={formik.values.Observacion}
                        {...commonTextFieldProps}
                        error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
                        helperText={formik.touched.Observacion && formik.errors.Observacion}
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
                            // setUpdateEstatusShowModal(false);
                        }
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                    {/*Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    //onClick={() => setAddInstituteShowModal(false)}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default UpdateEstatusModal;