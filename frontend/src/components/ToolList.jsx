import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export const ToolList = () => {
    const [tools, setTools] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        toolService
            .getAll()
            .then((response) => {
                console.log("Listado de herramientas", response.data);
                setTools(response.data);
            })
            .catch((error) => {
                console.log("No se pudo mostrar el listado de herramientas", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleEdit = (id) => {
        navigate(`/tool/edit/${id}`);
    };

    const handleDelete = (id) => {
        console.log("Eliminando herramienta con id:", id);
        const confirmDelete = window.confirm(
            "¿Está seguro que desea eliminar esta herramienta?"
        );
        if (confirmDelete) {
            toolService
                .remove(id)
                .then((response) => {
                    console.log("Herramienta eliminada.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "Se ha producido un error al intentar eliminar la herramienta",
                        error
                    );
                });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Herramientas</h2>
            <Link
                to="/tool/add"
                style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    Añadir Herramienta
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de herramientas">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Nombre
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Categoría
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Stock
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Costo Reposición
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Costo Diario
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Multa Diaria
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tools.map((tool) => (
                            <TableRow
                                key={tool.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">{tool.name}</TableCell>
                                <TableCell align="left">{tool.category}</TableCell>
                                <TableCell align="right">{tool.stock}</TableCell>
                                <TableCell align="right">${tool.repositionCost.toLocaleString()}</TableCell>
                                <TableCell align="right">${tool.dailyCost.toLocaleString()}</TableCell>
                                <TableCell align="right">${tool.dailyFine.toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        onClick={() => handleEdit(tool.id)}
                                        sx={{ mr: 1 }}
                                        startIcon={<EditIcon />}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(tool.id)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};