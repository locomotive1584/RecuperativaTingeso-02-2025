import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import egressService from "../services/egress.service";
import { Alert, Snackbar, Autocomplete } from "@mui/material";

export const formatDateToBackend = (dateString) => {
  if (!dateString) return '';
  // Asumiendo que dateString viene en formato YYYY-MM-DD
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const AddEgress = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [docType, setDocType] = useState("");
    const [numDoc, setNumDoc] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [docTypeOptions, setDocTypeOptions] = useState([]);
    const [reasonOptions, setReasonOptions] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        egressService.getAll()
            .then(response => {
                const docs = [...new Set(response.data.map(item => item.docType))];
                const reasons = [...new Set(response.data.map(item => item.reason))];
                setDocTypeOptions(docs);
                setReasonOptions(reasons);
            })
            .catch(error => {
                console.error("Error al cargar datos existentes:", error);
            });
    }, []);

    const showMessage = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
        if (snackbarSeverity === "success") {
            navigate("/egress/list");
        }
    };

    const saveEgress = (e) => {
        e.preventDefault();
        console.log("1. Función saveEgress iniciada");
        console.log("2. Valores de estado:", { date, docType, numDoc, reason, amount });

        if (!date || !docType || !numDoc || !reason || !amount) {
            console.log("3. Validación falló: campos vacíos");
            showMessage("Todos los campos son obligatorios", "error");
            return;
        }
        console.log("3. Validación pasó");

        const egress = {
            date: formatDateToBackend(date),
            docType,
            numDoc,
            reason,
            amount: parseInt(amount, 10)
        };
        console.log("4. Objeto a enviar:", egress);

        console.log("5. Llamando a egressService.create...");
        egressService.create(egress)
            .then(response => {
                console.log("6. Respuesta recibida:", response.data);
                showMessage("Egreso guardado correctamente", "success");
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
                console.error("7d. Error al configurar la petición:", error.message);
            }
            showMessage("Error al guardar el egreso. Intente nuevamente.", "error");
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
            <h3>Registrar Egreso</h3>
            <hr />
            <form onSubmit={saveEgress}>
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
                    <Autocomplete
                        freeSolo
                        options={docTypeOptions}
                        value={docType}
                        onChange={(event, newValue) => setDocType(newValue || "")}
                        onInputChange={(event, newInputValue) => setDocType(newInputValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Tipo de Documento" required />
                        )}
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
                    <Autocomplete
                        freeSolo
                        options={reasonOptions}
                        value={reason}
                        onChange={(event, newValue) => setReason(newValue || "")}
                        onInputChange={(event, newInputValue) => setReason(newInputValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Motivo" required />
                        )}
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
                        onClick={(e) => saveEgress(e)}
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