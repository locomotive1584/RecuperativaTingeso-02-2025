import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import devolutionService from "../services/devolution.service";

export const AddDevolution = () => {
    const [loanId, setLoanId] = useState("");
    const [devolutionDate, setDevolutionDate] = useState("");
    const navigate = useNavigate();

    const saveDevolution = (e) => {
        e.preventDefault();

        // Validación básica
        if (!loanId) {
            console.log("ERROR: ID de préstamo requerido");
            alert("Por favor ingrese el ID del préstamo");
            return;
        }

        // Nota: El controlador de devoluciones espera un long loanId en el body
        // Según el controller: createDevolution(@RequestBody long loanId)
        const loanIdNum = parseInt(loanId);

        // Para el endpoint POST /devolutions/ que recibe solo el loanId en el body
        // Necesitamos enviar solo el número, no un objeto
        devolutionService
            .create(loanIdNum)
            .then((response) => {
                console.log("Devolución creada exitosamente", response.data);
                alert("Devolución registrada exitosamente");
                navigate("/devolution/list");
            })
            .catch((error) => {
                console.log("No se pudo crear la devolución", error);
                alert("Error al crear la devolución: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{ p: 3 }}
        >
            <h3>Registrar Devolución</h3>
            <hr />
            <form style={{ width: '100%', maxWidth: 500 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="loanId"
                        label="ID del Préstamo"
                        type="number"
                        value={loanId}
                        variant="outlined"
                        onChange={(e) => setLoanId(e.target.value)}
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText="ID del préstamo que se está devolviendo"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                        id="devolutionDate"
                        label="Fecha de Devolución (Opcional)"
                        type="date"
                        value={devolutionDate}
                        variant="outlined"
                        onChange={(e) => setDevolutionDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Fecha real de devolución (si es diferente a hoy)"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveDevolution(e)}
                        startIcon={<SaveIcon />}
                        sx={{ mr: 2 }}
                    >
                        Registrar Devolución
                    </Button>
                </FormControl>
            </form>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/devolution/list" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Volver a la Lista
                </Button>
            </Link>
        </Box>
    );
};