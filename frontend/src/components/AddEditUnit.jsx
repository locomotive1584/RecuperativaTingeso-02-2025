import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import unitService from "../services/unit.service";
import toolService from "../services/tool.service";

export const AddEditUnit = () => {
    const [toolId, setToolId] = useState("");
    const [state, setState] = useState("Disponible");
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Estados válidos según el enunciado
    const validStates = ["Disponible", "Prestada", "En reparación", "Dada de baja"];

    // Cargar herramientas al iniciar
    useEffect(() => {
        toolService.getAll()
            .then(response => {
                console.log("Herramientas cargadas", response.data);
                setTools(response.data);
            })
            .catch(error => {
                console.log("Error al cargar herramientas", error);
                alert("Error al cargar herramientas: " + (error.response?.data?.message || error.message));
            });

        // Si hay ID, cargar datos de la unidad existente
        if (id) {
            setLoading(true);
            unitService.get(id)
                .then(response => {
                    const unit = response.data;
                    console.log("Unidad cargada", unit);
                    setToolId(unit.toolId?.toString() || "");
                    setState(unit.state || "Disponible");
                })
                .catch(error => {
                    console.log("Error al cargar unidad", error);
                    alert("Error al cargar unidad: " + (error.response?.data?.message || error.message));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const saveUnit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!toolId) {
            alert("Debe seleccionar una herramienta");
            return;
        }

        if (!validStates.includes(state)) {
            alert(`Estado inválido. Estados válidos: ${validStates.join(", ")}`);
            return;
        }

        const unit = {
            toolId: parseInt(toolId),
            state
        };

        setLoading(true);

        if (id) {
            // Actualizar unidad existente
            unit.id = parseInt(id);
            unitService.update(unit)
                .then(response => {
                    console.log("Unidad actualizada", response.data);
                    alert("Unidad actualizada exitosamente");
                    navigate("/unit/list");
                })
                .catch(error => {
                    console.log("Error al actualizar unidad", error);
                    alert("Error: " + (error.response?.data?.message || error.message));
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // Crear nueva unidad
            unitService.create(unit)
                .then(response => {
                    console.log("Unidad creada", response.data);
                    alert("Unidad creada exitosamente");
                    navigate("/unit/list");
                })
                .catch(error => {
                    console.log("Error al crear unidad", error);
                    alert("Error: " + (error.response?.data?.message || error.message));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 3 }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/unit/list")}
                        sx={{ mr: 2 }}
                    >
                        Volver
                    </Button>
                    <h3>{id ? "Editar Unidad" : "Nueva Unidad"}</h3>
                </Box>
                
                <Paper sx={{ p: 3 }}>
                    <form onSubmit={saveUnit}>
                        {/* Selección de Herramienta */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="tool-label">Herramienta *</InputLabel>
                            <Select
                                labelId="tool-label"
                                label="Herramienta *"
                                value={toolId}
                                onChange={(e) => setToolId(e.target.value)}
                                required
                                disabled={loading}
                            >
                                <MenuItem value="">Seleccione una herramienta</MenuItem>
                                {tools.map((tool) => (
                                    <MenuItem key={tool.id} value={tool.id}>
                                        {tool.name} (ID: {tool.id}, Stock: {tool.stock})
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box sx={{ fontSize: '0.875rem', color: '#666', mt: 1 }}>
                                Seleccione la herramienta a la que pertenece esta unidad física.
                            </Box>
                        </FormControl>

                        {/* Estado de la unidad */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="state-label">Estado *</InputLabel>
                            <Select
                                labelId="state-label"
                                label="Estado *"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                disabled={loading}
                            >
                                {validStates.map((validState) => (
                                    <MenuItem key={validState} value={validState}>
                                        {validState}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box sx={{ fontSize: '0.875rem', color: '#666', mt: 1 }}>
                                <strong>Disponible:</strong> Puede ser prestada<br/>
                                <strong>Prestada:</strong> Actualmente en préstamo<br/>
                                <strong>En reparación:</strong> No disponible por mantenimiento<br/>
                                <strong>Dada de baja:</strong> Eliminada del inventario
                            </Box>
                        </FormControl>

                        {/* Botones */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/unit/list")}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                startIcon={<SaveIcon />}
                            >
                                {loading ? "Guardando..." : (id ? "Actualizar Unidad" : "Crear Unidad")}
                            </Button>
                        </Box>
                    </form>
                </Paper>

                {/* Información adicional */}
                <Paper sx={{ p: 2, mt: 3, bgcolor: '#f0f7ff' }}>
                    <strong>Información importante:</strong>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                        <li>Cada unidad representa una copia física individual de una herramienta.</li>
                        <li>Cuando se presta una herramienta, se asigna automáticamente una unidad disponible.</li>
                        <li>El sistema actualizará automáticamente el estado de la unidad al realizar préstamos y devoluciones.</li>
                        <li>Para crear múltiples unidades de una misma herramienta, use la opción "Crear Múltiples Unidades".</li>
                    </ul>
                </Paper>
            </Box>
        </Box>
    );
};