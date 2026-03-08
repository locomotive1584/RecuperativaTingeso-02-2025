import { useState, useEffect } from "react";
import reportService from "../services/report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/Warning";
import BlockIcon from "@mui/icons-material/Block";

export const DelayedClientsReport = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const init = () => {
        setLoading(true);
        reportService.getClientsWithDelays()
            .then((response) => {
                console.log("Clientes con atrasos", response.data);
                setClients(response.data);
            })
            .catch((error) => {
                console.log("Error al cargar clientes con atrasos", error);
                alert("Error al cargar el reporte: " + (error.response?.data?.message || error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Reporte de Clientes con Atrasos</h2>
            <p>Clientes con préstamos vencidos, multas impagas o deudas pendientes</p>
            
            {clients.length > 0 && (
                <Box sx={{ mb: 2, p: 2, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffeaa7' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon sx={{ color: '#856404' }} />
                        <strong>Alerta:</strong> 
                        <span>{clients.length} clientes con atrasos detectados</span>
                    </Box>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: "bold" }}>RUT</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Contacto</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    {loading ? "Cargando..." : "No hay clientes con atrasos"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            clients.map((client) => (
                                <TableRow key={client.id} hover>
                                    <TableCell>{client.rut || 'N/A'}</TableCell>
                                    <TableCell>{client.name || 'N/A'}</TableCell>
                                    <TableCell>{client.contact || 'N/A'}</TableCell>
                                    <TableCell>{client.email || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color={client.state === 'RESTRINGIDO' ? 'error' : 'warning'}
                                            startIcon={client.state === 'RESTRINGIDO' ? <BlockIcon /> : <WarningIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {client.state || 'DESCONOCIDO'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};