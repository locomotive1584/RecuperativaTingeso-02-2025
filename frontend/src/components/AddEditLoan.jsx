import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import loanService from "../services/loan.service";

export const AddEditLoan = () => {
    const [initialDate, setInitialDate] = useState("");
    const [agreedDate, setAgreedDate] = useState("");
    const [toolId, setToolId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [clientId, setClientId] = useState("");
    const { id } = useParams();
    const [titleLoanForm, setTitleLoanForm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setTitleLoanForm("Editar Préstamo");
            loanService
                .get(id)
                .then((response) => {
                    const loan = response.data;
                    // Convertir las fechas de LocalDate a formato input date (YYYY-MM-DD)
                    setInitialDate(loan.initialDate);
                    setAgreedDate(loan.agreedDate);
                    setToolId(loan.toolId);
                    setUnitId(loan.unitId);
                    setClientId(loan.clientId);
                })
                .catch((error) => {
                    console.log("No se pudo cargar el préstamo", error);
                });
        } else {
            setTitleLoanForm("Registrar Nuevo Préstamo");
        }
    }, [id]);

    const saveLoan = (e) => {
        e.preventDefault();

        const loan = {
            initialDate,
            agreedDate,
            toolId: parseInt(toolId),
            unitId: parseInt(unitId),
            clientId: parseInt(clientId)
        };

        // Validación básica
        if (!initialDate || !agreedDate || !toolId || !unitId || !clientId) {
            console.log("ERROR: Datos inválidos o faltantes");
            alert("Por favor complete todos los campos");
            return;
        }

        if (new Date(agreedDate) < new Date(initialDate)) {
            console.log("ERROR: La fecha de devolución no puede ser anterior a la fecha de entrega");
            alert("La fecha de devolución no puede ser anterior a la fecha de entrega");
            return;
        }

        if (id) {
            loan.id = id;
            // En este caso, no hay endpoint para update, pero si existe en el controlador, se podría agregar
            console.log("Actualizar préstamo no implementado");
            alert("La actualización de préstamos no está disponible");
        } else {
            loanService
                .create(loan)
                .then((response) => {
                    console.log("Préstamo creado exitosamente", response.data);
                    alert("Préstamo registrado exitosamente");
                    navigate("/loan/list");
                })
                .catch((error) => {
                    console.log("No se pudo crear el préstamo", error);
                    alert("Error al crear el préstamo: " + (error.response?.data?.message || error.message));
                });
        }
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
            <h3>{titleLoanForm}</h3>
            <hr />
            <form style={{ width: '100%', maxWidth: 500 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="initialDate"
                        label="Fecha de Entrega"
                        type="date"
                        value={initialDate}
                        variant="outlined"
                        onChange={(e) => setInitialDate(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Fecha en que se entrega la herramienta"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="agreedDate"
                        label="Fecha Acordada de Devolución"
                        type="date"
                        value={agreedDate}
                        variant="outlined"
                        onChange={(e) => setAgreedDate(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Fecha pactada para la devolución"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="toolId"
                        label="ID de la Herramienta"
                        type="number"
                        value={toolId}
                        variant="outlined"
                        onChange={(e) => setToolId(e.target.value)}
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText="ID de la herramienta prestada"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="unitId"
                        label="ID de la Unidad"
                        type="number"
                        value={unitId}
                        variant="outlined"
                        onChange={(e) => setUnitId(e.target.value)}
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText="ID de la unidad específica"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                        id="clientId"
                        label="ID del Cliente"
                        type="number"
                        value={clientId}
                        variant="outlined"
                        onChange={(e) => setClientId(e.target.value)}
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText="ID del cliente que solicita el préstamo"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveLoan(e)}
                        startIcon={<SaveIcon />}
                        sx={{ mr: 2 }}
                    >
                        Guardar
                    </Button>
                </FormControl>
            </form>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/loan/list" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Volver a la Lista
                </Button>
            </Link>
        </Box>
    );
};