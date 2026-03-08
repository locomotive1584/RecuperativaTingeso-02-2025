import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import billService from "../services/bill.service";
import toolService from "../services/tool.service";

export const BillManagement = () => {
    const [toolId, setToolId] = useState("");
    const [tool, setTool] = useState(null);
    const [dailyCost, setDailyCost] = useState("");
    const [dailyFine, setDailyFine] = useState("");
    const [repositionCost, setRepositionCost] = useState("");
    const [loading, setLoading] = useState(false);

    const loadTool = () => {
        if (!toolId) {
            alert("Por favor ingrese un ID de herramienta");
            return;
        }

        setLoading(true);
        toolService.get(toolId)
            .then((response) => {
                setTool(response.data);
                setDailyCost(response.data.dailyCost || "");
                setDailyFine(response.data.dailyFine || "");
                setRepositionCost(response.data.repositionCost || "");
                console.log("Herramienta cargada:", response.data);
            })
            .catch((error) => {
                console.log("No se pudo cargar la herramienta", error);
                alert("Herramienta no encontrada. Verifique el ID.");
                setTool(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const saveDailyCost = (e) => {
        e.preventDefault();
        if (!toolId || !dailyCost) {
            alert("ID de herramienta y costo diario son requeridos");
            return;
        }

        billService.setDailyCost(toolId, parseInt(dailyCost))
            .then((response) => {
                console.log("Costo diario actualizado", response);
                alert("Costo diario actualizado exitosamente");
                loadTool(); // Recargar datos
            })
            .catch((error) => {
                console.log("No se pudo actualizar el costo diario", error);
                alert("Error al actualizar el costo diario: " + (error.response?.data?.message || error.message));
            });
    };

    const saveDailyFine = (e) => {
        e.preventDefault();
        if (!toolId || !dailyFine) {
            alert("ID de herramienta y multa diaria son requeridos");
            return;
        }

        billService.setDailyFine(toolId, parseInt(dailyFine))
            .then((response) => {
                console.log("Multa diaria actualizada", response);
                alert("Multa diaria actualizada exitosamente");
                loadTool(); // Recargar datos
            })
            .catch((error) => {
                console.log("No se pudo actualizar la multa diaria", error);
                alert("Error al actualizar la multa diaria: " + (error.response?.data?.message || error.message));
            });
    };

    const saveRepositionCost = (e) => {
        e.preventDefault();
        if (!toolId || !repositionCost) {
            alert("ID de herramienta y costo de reposición son requeridos");
            return;
        }

        billService.setRepositionCost(toolId, parseInt(repositionCost))
            .then((response) => {
                console.log("Costo de reposición actualizado", response);
                alert("Costo de reposición actualizado exitosamente");
                loadTool(); // Recargar datos
            })
            .catch((error) => {
                console.log("No se pudo actualizar el costo de reposición", error);
                alert("Error al actualizar el costo de reposición: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 3 }}
        >
            <h3>Gestión de Tarifas y Costos</h3>
            <p>Configuración de tarifas de arriendo, multas y valores de reposición</p>
            <hr style={{ width: '100%', margin: '20px 0' }} />

            {/* Búsqueda de herramienta */}
            <Box sx={{ width: '100%', maxWidth: 500, mb: 3 }}>
                <h4>Buscar Herramienta</h4>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="toolId"
                        label="ID de la Herramienta"
                        type="number"
                        value={toolId}
                        variant="outlined"
                        onChange={(e) => setToolId(e.target.value)}
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText="Ingrese el ID de la herramienta a configurar"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={loadTool}
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Cargar Herramienta"}
                </Button>
            </Box>

            {tool && (
                <Box sx={{ width: '100%', maxWidth: 500, mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <h4>Información de la Herramienta</h4>
                    <p><strong>Nombre:</strong> {tool.name}</p>
                    <p><strong>Categoría:</strong> {tool.category}</p>
                    <p><strong>Stock:</strong> {tool.stock}</p>
                    <p><strong>Costo Diario Actual:</strong> ${tool.dailyCost?.toLocaleString() || 'No definido'}</p>
                    <p><strong>Multa Diaria Actual:</strong> ${tool.dailyFine?.toLocaleString() || 'No definido'}</p>
                    <p><strong>Costo Reposición Actual:</strong> ${tool.repositionCost?.toLocaleString() || 'No definido'}</p>
                </Box>
            )}

            {/* Formulario para actualizar costos */}
            {tool && (
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    <h4>Actualizar Tarifas</h4>

                    {/* Costo Diario */}
                    <form onSubmit={saveDailyCost}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                id="dailyCost"
                                label="Nuevo Costo Diario"
                                type="number"
                                value={dailyCost}
                                variant="outlined"
                                onChange={(e) => setDailyCost(e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                                helperText="Tarifa de arriendo diaria en $"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            sx={{ mb: 3 }}
                        >
                            Actualizar Costo Diario
                        </Button>
                    </form>

                    {/* Multa Diaria */}
                    <form onSubmit={saveDailyFine}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                id="dailyFine"
                                label="Nueva Multa Diaria"
                                type="number"
                                value={dailyFine}
                                variant="outlined"
                                onChange={(e) => setDailyFine(e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                                helperText="Multa por día de atraso en $"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            sx={{ mb: 3 }}
                        >
                            Actualizar Multa Diaria
                        </Button>
                    </form>

                    {/* Costo de Reposición */}
                    <form onSubmit={saveRepositionCost}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                id="repositionCost"
                                label="Nuevo Costo de Reposición"
                                type="number"
                                value={repositionCost}
                                variant="outlined"
                                onChange={(e) => setRepositionCost(e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                                helperText="Valor de reposición de la herramienta en $"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            sx={{ mb: 3 }}
                        >
                            Actualizar Costo de Reposición
                        </Button>
                    </form>
                </Box>
            )}

            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Volver al Inicio
                </Button>
            </Link>
        </Box>
    );
};