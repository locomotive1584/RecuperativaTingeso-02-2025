import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import unitService from "../services/unit.service";
import toolService from "../services/tool.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export const UnitList = () => {
    const [units, setUnits] = useState([]);
    const [tools, setTools] = useState({}); // Para mapear toolId a nombre
    const [loading, setLoading] = useState(false);
    const [filterToolId, setFilterToolId] = useState("");
    const [filterState, setFilterState] = useState("");
    const navigate = useNavigate();

    const init = () => {
        setLoading(true);
        
        // Primero cargar herramientas para mapear IDs a nombres
        toolService.getAll()
            .then(toolResponse => {
                const toolMap = {};
                toolResponse.data.forEach(tool => {
                    toolMap[tool.id] = tool.name;
                });
                setTools(toolMap);
                
                // Luego cargar unidades
                return unitService.getAll();
            })
            .then(unitResponse => {
                console.log("Lista de unidades", unitResponse.data);
                setUnits(unitResponse.data);
            })
            .catch(error => {
                console.log("Error al cargar datos", error);
                alert("Error al cargar unidades: " + (error.response?.data?.message || error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Está seguro de eliminar esta unidad?");
        if (confirmDelete) {
            unitService.remove(id)
                .then(response => {
                    console.log("Unidad eliminada", response.data);
                    alert("Unidad eliminada exitosamente");
                    init(); // Recargar la lista
                })
                .catch(error => {
                    console.log("Error al eliminar unidad", error);
                    alert("Error al eliminar unidad: " + (error.response?.data?.message || error.message));
                });
        }
    };

    const getStateColor = (state) => {
        switch(state) {
            case "Disponible": return "success";
            case "Prestada": return "warning";
            case "En reparación": return "error";
            case "Dada de baja": return "default";
            default: return "default";
        }
    };

    const filteredUnits = units.filter(unit => {
        if (filterToolId && unit.toolId != filterToolId) return false;
        if (filterState && unit.state !== filterState) return false;
        return true;
    });

    const uniqueStates = [...new Set(units.map(unit => unit.state))];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Gestión de Unidades</h2>
            <p>Unidades físicas individuales de herramientas disponibles para préstamo</p>
            
            {/* Filtros */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                    label="Filtrar por ID Herramienta"
                    type="number"
                    value={filterToolId}
                    onChange={(e) => setFilterToolId(e.target.value)}
                    size="small"
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{ width: 200 }}
                />
                
                <TextField
                    select
                    label="Filtrar por Estado"
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    size="small"
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ width: 200 }}
                >
                    <option value="">Todos los estados</option>
                    {uniqueStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </TextField>
                
                <Button
                    variant="outlined"
                    onClick={() => {
                        setFilterToolId("");
                        setFilterState("");
                    }}
                    size="small"
                >
                    Limpiar Filtros
                </Button>
                
                <Box sx={{ flexGrow: 1 }} />
                
                <Link to="/unit/add" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Nueva Unidad
                    </Button>
                </Link>
            </Box>

            {/* Estadísticas */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                    label={`Total: ${units.length}`} 
                    color="primary" 
                    variant="outlined" 
                />
                <Chip 
                    label={`Disponibles: ${units.filter(u => u.state === "Disponible").length}`} 
                    color="success" 
                    variant="outlined" 
                />
                <Chip 
                    label={`Prestadas: ${units.filter(u => u.state === "Prestada").length}`} 
                    color="warning" 
                    variant="outlined" 
                />
                <Chip 
                    label={`En reparación: ${units.filter(u => u.state === "En reparación").length}`} 
                    color="error" 
                    variant="outlined" 
                />
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de unidades">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: "bold" }}>ID Unidad</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Herramienta</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>ID Herramienta</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Cargando...</TableCell>
                            </TableRow>
                        ) : filteredUnits.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    {units.length === 0 ? "No hay unidades registradas" : "No hay unidades que coincidan con los filtros"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUnits.map((unit) => (
                                <TableRow key={unit.id} hover>
                                    <TableCell>
                                        <strong>{unit.id}</strong>
                                    </TableCell>
                                    <TableCell>
                                        {tools[unit.toolId] || `Herramienta #${unit.toolId}`}
                                    </TableCell>
                                    <TableCell>{unit.toolId}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={unit.state || "Desconocido"} 
                                            color={getStateColor(unit.state)} 
                                            size="small" 
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate(`/unit/edit/${unit.id}`)}
                                            startIcon={<EditIcon />}
                                            sx={{ mr: 1 }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(unit.id)}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Información adicional */}
            {units.length > 0 && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                    <strong>Nota:</strong> Las unidades representan las copias físicas individuales de cada herramienta. 
                    Al crear un préstamo, el sistema automáticamente asigna una unidad disponible de la herramienta seleccionada.
                </Box>
            )}
        </div>
    );
};