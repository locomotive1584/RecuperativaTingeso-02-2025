import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import devolutionService from "../services/devolution.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";

export const DevolutionList = () => {
    const [devolutions, setDevolutions] = useState([]);

    const init = () => {
        devolutionService
            .getAll()
            .then((response) => {
                console.log("Listado de devoluciones", response.data);
                setDevolutions(response.data);
            })
            .catch((error) => {
                console.log("No se pudo mostrar el listado de devoluciones", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    const calculateCost = (devolutionId) => {
        devolutionService.getCost(devolutionId)
            .then(response => {
                alert(`Costo de la devolución #${devolutionId}: $${response.data.toLocaleString()}`);
            })
            .catch(error => {
                console.log("Error al obtener costo", error);
                alert("Error al calcular el costo: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Devoluciones</h2>
            <Link
                to="/devolution/add"
                style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    Registrar Nueva Devolución
                </Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de devoluciones">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Fecha Devolución
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                ID Préstamo
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                Calcular Costo
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devolutions.map((devolution) => (
                            <TableRow
                                key={devolution.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">{devolution.id}</TableCell>
                                <TableCell align="left">{formatDate(devolution.devolutionDate)}</TableCell>
                                <TableCell align="right">{devolution.loanId}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => calculateCost(devolution.id)}
                                        startIcon={<CalculateIcon />}
                                    >
                                        Calcular
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