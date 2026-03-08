import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loanService from "../services/loan.service";
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

export const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        loanService
            .getAll()
            .then((response) => {
                console.log("Listado de préstamos", response.data);
                setLoans(response.data);
            })
            .catch((error) => {
                console.log("No se pudo mostrar el listado de préstamos", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleEdit = (id) => {
        navigate(`/loan/edit/${id}`);
    };

    const handleDelete = (id) => {
        // Nota: No hay endpoint para eliminar préstamo, pero si se desea, se puede agregar.
        console.log("Eliminar préstamo no implementado");
        alert("La eliminación de préstamos no está disponible");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Préstamos</h2>
            <Link
                to="/loan/add"
                style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    Registrar Nuevo Préstamo
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de préstamos">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Fecha de Entrega
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Fecha Acordada
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                ID Herramienta
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
                        {loans.map((loan) => (
                            <TableRow
                                key={loan.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">{loan.id}</TableCell>
                                <TableCell align="left">{formatDate(loan.initialDate)}</TableCell>
                                <TableCell align="left">{formatDate(loan.agreedDate)}</TableCell>
                                <TableCell align="right">{loan.toolId}</TableCell>
                                <TableCell align="right">{loan.unitId}</TableCell>
                                <TableCell align="right">{loan.clientId}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        onClick={() => handleEdit(loan.id)}
                                        sx={{ mr: 1 }}
                                        startIcon={<EditIcon />}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(loan.id)}
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