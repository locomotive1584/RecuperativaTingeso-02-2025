import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import movementService from "../services/movement.service";

export const AddMovement = () => {
    const [newState, setNewState] = useState("");
    const [date, setDate] = useState("");
    const [unitId, setUnitId] = useState("");
    const [clientId, setClientId] = useState("");
    const navigate = useNavigate();

    // Estados válidos según el enunciado
    const validStates = ["Disponible", "Prestada", "En reparación", "Dada de baja"];

    // Establecer la fecha actual por defecto
    useState(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const saveMovement = (e) => {
        e.preventDefault();

        const movement = {
            newState,
            date,
            unitId: parseInt(unitId),
            clientId: parseInt(clientId)
        };

        // Validación básica
        if (!newState || !date || !unitId || !clientId) {
            alert("Todos los campos son requeridos");
            return;
        }

        if (!validStates.includes(newState)) {
            alert(`Estado inválido. Estados válidos: ${validStates.join(", ")}`);
            return;
        }

        movementService.create(movement)
            .then((response) => {
                console.log("Movimiento creado exitosamente", response.data);
                alert("Movimiento creado exitosamente");
                navigate("/movements/list");
            })
            .catch((error) => {
                console.log("No se pudo crear el movimiento", error);
                alert("Error al crear el movimiento: " + (error.response?.data?.message || error.message));
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
            <h3>Nuevo Movimiento</h3>
            <hr />
            <form style={{ width: '100%', maxWidth: 500 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="newState"
                        label="Nuevo Estado"
                        value={newState}
                        variant="outlined"
                        onChange={(e) => setNewState(e.target.value)}
                        required
                        helperText="Estados válidos: Disponible, Prestada, En reparación, Dada de baja"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="date"
                        label="Fecha"
                        type="date"
                        value={date}
                        variant="outlined"
                        onChange={(e) => setDate(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Fecha del movimiento"
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
                        helperText="ID del cliente relacionado"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveMovement(e)}
                        startIcon={<SaveIcon />}
                        sx={{ mr: 2 }}
                    >
                        Guardar
                    </Button>
                </FormControl>
            </form>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/movements/list" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="secondary">
                    Volver a la Lista
                </Button>
            </Link>
        </Box>
    );
};