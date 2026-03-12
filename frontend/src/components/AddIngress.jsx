import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import ingressService from "../services/ingress.service";
import { Alert, Snackbar } from "@mui/material";

export const AddIngress = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [numDoc, setNumDoc] = useState("");
    const [amount, setAmount] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const showMessage = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
        if (snackbarSeverity === "success") {
            navigate("/ingress/list");
        }
    };

    const saveIngress = (e) => {
        e.preventDefault();
        console.log("1. Función saveIngress iniciada");
        console.log("2. Valores de estado:", { date, numDoc, amount });



        if (!date || !numDoc || !amount) {
            console.log("3. Validación falló: campos vacíos");
            showMessage("Todos los campos son obligatorios", "error");
            return;
        }
        console.log("3. Validación pasó");

        const ingress = {
            date,
            numDoc,
            amount: parseInt(amount, 10)
        };
        console.log("4. Objeto a enviar:", ingress);

        console.log("5. Llamando a ingressService.create...");
        ingressService.create(ingress)
            .then(response => {
                console.log("6. Respuesta recibida:", response.data);
                showMessage("Ingreso guardado correctamente", "success");
            })
            .catch(error => {
                console.error("7. Error en la petición:", error);
            if (error.response) {
                console.error("7a. Datos del error:", error.response.data);
                console.error("7b. Status:", error.response.status);
            } else if (error.request) {
                console.error("7c. No se recibió respuesta del servidor");
            } else {
                const server = import.meta.env.VITE_EVALUACION1TINGESO_BACKEND_SERVER;
                const port = import.meta.env.VITE_EVALUACION1TINGESO_BACKEND_PORT;
                const baseURL = `http://${server}:${port}`;
                console.log('URL base:', baseURL);
                console.error("7d. Error al configurar la petición:", error.message,"\n");
            }
                showMessage("Error al guardar el ingreso. Intente nuevamente.", "error");
            });
        };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{ mt: 4 }}
        >
            <h3>Registrar Ingreso</h3>
            <hr />
            <form onSubmit={saveIngress}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Fecha"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Número de Documento"
                        value={numDoc}
                        onChange={(e) => setNumDoc(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Monto"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveIngress(e)}
                        startIcon={<SaveIcon />}
                    >
                        Guardar
                    </Button>
                </FormControl>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};