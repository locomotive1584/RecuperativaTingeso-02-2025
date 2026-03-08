import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movementService from "../services/movement.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const MovementList = () => {
    const [movements, setMovements] = useState([]);

    const init = () => {
        movementService.getAll()
            .then((response) => {
                console.log("Listado de movimientos", response.data);
                setMovements(response.data);
            })
            .catch((error) => {
                console.log("No se pudo mostrar el listado de movimientos", error);
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
        console.log("Eliminando movimiento con id:", id);
        const confirmDelete = window.confirm(
            "¿Está seguro que desea eliminar este movimiento?"
        );
        if (confirmDelete) {
            movementService.remove(id)
                .then((response) => {
                    console.log("Movimiento eliminado.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "Se ha producido un error al intentar eliminar el movimiento",
                        error
                    );
                });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Movimientos de Herramientas</h2>
            <Link
                to="/movements/add"
                style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    Nuevo Movimiento
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de movimientos">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Nuevo Estado
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Fecha
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                ID Unidad
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                ID Cliente
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movements.map((movement) => (
                            <TableRow
                                key={movement.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">{movement.id}</TableCell>
                                <TableCell align="left">{movement.newState}</TableCell>
                                <TableCell align="left">{formatDate(movement.date)}</TableCell>
                                <TableCell align="right">{movement.unitId}</TableCell>
                                <TableCell align="right">{movement.clientId}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(movement.id)}
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