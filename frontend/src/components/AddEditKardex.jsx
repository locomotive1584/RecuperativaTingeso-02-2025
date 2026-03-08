import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import kardexService from "../services/kardex.service";

export const AddEditKardex = () => {
    const [toolId, setToolId] = useState("");
    const [ingress, setIngress] = useState(0);
    const [devolutions, setDevolutions] = useState(0);
    const [stock, setStock] = useState(0);
    const [loans, setLoans] = useState(0);
    const [discharged, setDischarged] = useState(0);
    const [repairing, setRepairing] = useState(0);
    const [date, setDate] = useState("");
    const { id } = useParams();
    const [titleKardexForm, setTitleKardexForm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setTitleKardexForm("Editar Registro de Kardex");
            kardexService.get(id)
                .then((response) => {
                    const kardex = response.data;
                    setToolId(kardex.toolId);
                    setIngress(kardex.ingress);
                    setDevolutions(kardex.devolutions);
                    setStock(kardex.stock);
                    setLoans(kardex.loans);
                    setDischarged(kardex.discharged);
                    setRepairing(kardex.repairing);
                    setDate(kardex.date);
                })
                .catch((error) => {
                    console.log("No se pudo cargar el registro de kardex", error);
                });
        } else {
            setTitleKardexForm("Nuevo Registro de Kardex");
            // Establecer la fecha actual por defecto
            const today = new Date().toISOString().split('T')[0];
            setDate(today);
        }
    }, [id]);

    const saveKardex = (e) => {
        e.preventDefault();

        const kardex = {
            toolId: parseInt(toolId),
            ingress: parseInt(ingress),
            devolutions: parseInt(devolutions),
            stock: parseInt(stock),
            loans: parseInt(loans),
            discharged: parseInt(discharged),
            repairing: parseInt(repairing),
            date: date
        };

        // Validación básica
        if (!toolId || !date) {
            alert("ID de herramienta y fecha son requeridos");
            return;
        }

        if (id) {
            kardex.id = id;
            kardexService.update(kardex)
                .then((response) => {
                    console.log("Registro de kardex actualizado.", response.data);
                    alert("Registro de kardex actualizado exitosamente");
                    navigate("/kardex/list");
                })
                .catch((error) => {
                    console.log("No se pudo actualizar el registro de kardex", error);
                    alert("Error al actualizar el registro de kardex: " + (error.response?.data?.message || error.message));
                });
        } else {
            kardexService.create(kardex)
                .then((response) => {
                    console.log("Registro de kardex creado exitosamente", response.data);
                    alert("Registro de kardex creado exitosamente");
                    navigate("/kardex/list");
                })
                .catch((error) => {
                    console.log("No se pudo crear el registro de kardex", error);
                    alert("Error al crear el registro de kardex: " + (error.response?.data?.message || error.message));
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
            <h3>{titleKardexForm}</h3>
            <hr />
            <form style={{ width: '100%', maxWidth: 500 }}>
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
                        helperText="ID de la herramienta en el sistema"
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
                        id="ingress"
                        label="Ingresos"
                        type="number"
                        value={ingress}
                        variant="outlined"
                        onChange={(e) => setIngress(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad de ingresos"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="devolutions"
                        label="Devoluciones"
                        type="number"
                        value={devolutions}
                        variant="outlined"
                        onChange={(e) => setDevolutions(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad de devoluciones"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="stock"
                        label="Stock"
                        type="number"
                        value={stock}
                        variant="outlined"
                        onChange={(e) => setStock(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad en stock"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="loans"
                        label="Préstamos"
                        type="number"
                        value={loans}
                        variant="outlined"
                        onChange={(e) => setLoans(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad de préstamos"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="discharged"
                        label="Bajas"
                        type="number"
                        value={discharged}
                        variant="outlined"
                        onChange={(e) => setDischarged(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad de bajas"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                        id="repairing"
                        label="En Reparación"
                        type="number"
                        value={repairing}
                        variant="outlined"
                        onChange={(e) => setRepairing(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Cantidad en reparación"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveKardex(e)}
                        startIcon={<SaveIcon />}
                        sx={{ mr: 2 }}
                    >
                        Guardar
                    </Button>
                </FormControl>
            </form>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/kardex/list" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="secondary">
                    Volver a la Lista
                </Button>
            </Link>
        </Box>
    );
};