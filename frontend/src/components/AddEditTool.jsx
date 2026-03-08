import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import toolService from "../services/tool.service";

export const AddEditTool = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [repositionCost, setRepositionCost] = useState(0);
    const [dailyCost, setDailyCost] = useState(0);
    const [dailyFine, setDailyFine] = useState(0);
    const { id } = useParams();
    const [titleToolForm, setTitleToolForm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setTitleToolForm("Editar Herramienta");
            toolService
                .get(id)
                .then((response) => {
                    const tool = response.data;
                    setName(tool.name);
                    setCategory(tool.category);
                    setStock(tool.stock);
                    setRepositionCost(tool.repositionCost);
                    setDailyCost(tool.dailyCost);
                    setDailyFine(tool.dailyFine);
                })
                .catch((error) => {
                    console.log("No se pudo cargar la herramienta", error);
                });
        } else {
            setTitleToolForm("Añadir Herramienta");
        }
    }, [id]);

    const saveTool = (e) => {
        e.preventDefault();

        const tool = {
            name,
            category,
            stock: parseInt(stock),
            repositionCost: parseInt(repositionCost),
            dailyCost: parseInt(dailyCost),
            dailyFine: parseInt(dailyFine)
        };

        if (!name || !category || stock < 0 || repositionCost < 0 || dailyCost < 0 || dailyFine < 0) {
            console.log("ERROR: Datos inválidos o faltantes");
            return;
        }

        if (id) {
            tool.id = id;
            toolService
                .update(tool)
                .then((response) => {
                    console.log("Herramienta actualizada.", response.data);
                    navigate("/tool/list");
                })
                .catch((error) => {
                    console.log("No se pudo actualizar la herramienta", error);
                });
        } else {
            toolService
                .create(tool)
                .then((response) => {
                    console.log("Herramienta añadida al sistema", response.data);
                    navigate("/tool/list");
                })
                .catch((error) => {
                    console.log("No se pudo registrar la nueva herramienta", error);
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
            <h3>{titleToolForm}</h3>
            <hr />
            <form style={{ width: '100%', maxWidth: 500 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="name"
                        label="Nombre"
                        value={name}
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        required
                        helperText="Nombre de la herramienta"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="category"
                        label="Categoría"
                        value={category}
                        variant="outlined"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        helperText="Ej: Construcción, Electricidad, Jardinería"
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
                        helperText="Cantidad disponible"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="repositionCost"
                        label="Costo de Reposición"
                        type="number"
                        value={repositionCost}
                        variant="outlined"
                        onChange={(e) => setRepositionCost(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Valor en $"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        id="dailyCost"
                        label="Costo Diario"
                        type="number"
                        value={dailyCost}
                        variant="outlined"
                        onChange={(e) => setDailyCost(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Tarifa de arriendo diaria"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                        id="dailyFine"
                        label="Multa Diaria"
                        type="number"
                        value={dailyFine}
                        variant="outlined"
                        onChange={(e) => setDailyFine(e.target.value)}
                        InputProps={{ inputProps: { min: 0 } }}
                        helperText="Multa por día de atraso"
                    />
                </FormControl>

                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => saveTool(e)}
                        startIcon={<SaveIcon />}
                        sx={{ mr: 2 }}
                    >
                        Guardar
                    </Button>
                </FormControl>
            </form>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Link to="/tool/list" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Volver a la Lista
                </Button>
            </Link>
        </Box>
    );
};