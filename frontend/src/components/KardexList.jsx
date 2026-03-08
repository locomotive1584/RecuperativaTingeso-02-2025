import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kardexService from "../services/kardex.service";
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

export const KardexList = () => {
    const [kardex, setKardex] = useState([]);

    const init = () => {
        kardexService.getAll()
            .then((response) => {
                console.log("Listado de kardex", response.data);
                setKardex(response.data);
            })
            .catch((error) => {
                console.log("No se pudo mostrar el listado de kardex", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    const handleDelete = (id) => {
        console.log("Eliminando kardex con id:", id);
        const confirmDelete = window.confirm(
            "¿Está seguro que desea eliminar este registro de kardex?"
        );
        if (confirmDelete) {
            kardexService.remove(id)
                .then((response) => {
                    console.log("Registro de kardex eliminado.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "Se ha producido un error al intentar eliminar el registro de kardex",
                        error
                    );
                });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Kardex de Herramientas</h2>
            <Link
                to="/kardex/add"
                style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    Nuevo Registro de Kardex
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de kardex">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                ID Herramienta
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Ingresos
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Devoluciones
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Stock
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Préstamos
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Bajas
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Reparación
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Fecha
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {kardex.map((k) => (
                            <TableRow
                                key={k.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">{k.id}</TableCell>
                                <TableCell align="left">{k.toolId}</TableCell>
                                <TableCell align="right">{k.ingress}</TableCell>
                                <TableCell align="right">{k.devolutions}</TableCell>
                                <TableCell align="right">{k.stock}</TableCell>
                                <TableCell align="right">{k.loans}</TableCell>
                                <TableCell align="right">{k.discharged}</TableCell>
                                <TableCell align="right">{k.repairing}</TableCell>
                                <TableCell align="left">{formatDate(k.date)}</TableCell>
                                <TableCell align="center">
                                    <Link to={'/kardex/edit/${k.id}'} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            startIcon={<EditIcon />}
                                        >
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(k.id)}
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