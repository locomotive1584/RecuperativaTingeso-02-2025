import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import unitService from "../services/unit.service";
import toolService from "../services/tool.service";
import Paper from "@mui/material/Paper";

export const CreateMultipleUnits = () => {
    const [toolId, setToolId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [state, setState] = useState("Disponible");
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
    }, []);

    const createMultipleUnits = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!toolId) {
            alert("Debe seleccionar una herramienta");
            return;
        }

        if (quantity <= 0 || quantity > 100) {
            alert("La cantidad debe estar entre 1 y 100");
            return;
        }

        setLoading(true);

        try {
            // Crear unidades una por una
            const createdUnits = [];
            const selectedTool = tools.find(t => t.id == toolId);
            
            for (let i = 0; i < quantity; i++) {
                const unit = {
                    toolId: parseInt(toolId),
                    state
                };
                
                const response = await unitService.create(unit);
                createdUnits.push(response.data);
            }

            console.log(`${quantity} unidades creadas`, createdUnits);
            alert(`¡${quantity} unidad(es) de "${selectedTool?.name}" creada(s) exitosamente!`);
            navigate("/unit/list");
            
        } catch (error) {
            console.log("Error al crear unidades", error);
            alert("Error: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
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
                    <h3>Crear Múltiples Unidades</h3>
                </Box>
                
                <Paper sx={{ p: 3 }}>
                    <form onSubmit={createMultipleUnits}>
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
                                        {tool.name} (ID: {tool.id})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Cantidad */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <TextField
                                label="Cantidad *"
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value >= 1 && value <= 100) {
                                        setQuantity(value);
                                    }
                                }}
                                required
                                InputProps={{
                                    inputProps: { min: 1, max: 100 }
                                }}
                                helperText="Número de unidades a crear (1-100)"
                                disabled={loading}
                            />
                        </FormControl>

                        {/* Estado inicial */}
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel id="state-label">Estado Inicial *</InputLabel>
                            <Select
                                labelId="state-label"
                                label="Estado Inicial *"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                disabled={loading}
                            >
                                <MenuItem value="Disponible">Disponible</MenuItem>
                                <MenuItem value="En reparación">En reparación</MenuItem>
                            </Select>
                            <Box sx={{ fontSize: '0.875rem', color: '#666', mt: 1 }}>
                                Recomendado: "Disponible" para unidades nuevas listas para préstamo.
                            </Box>
                        </FormControl>

                        {/* Botones */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
                                disabled={loading || !toolId || quantity < 1}
                                startIcon={<AddCircleIcon />}
                            >
                                {loading ? "Creando..." : `Crear ${quantity} Unidad(es)`}
                            </Button>
                        </Box>
                    </form>
                </Paper>

                {/* Información */}
                <Paper sx={{ p: 2, mt: 3, bgcolor: '#f0f7ff' }}>
                    <strong>¿Por qué crear múltiples unidades?</strong>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                        <li>Cuando una herramienta tiene varias copias físicas disponibles.</li>
                        <li>Para inicializar el inventario con múltiples unidades del mismo tipo.</li>
                        <li>Cuando se adquieren nuevas herramientas en lote.</li>
                        <li>Cada unidad será identificada con un ID único automáticamente.</li>
                    </ul>
                </Paper>
            </Box>
        </Box>
    );
};