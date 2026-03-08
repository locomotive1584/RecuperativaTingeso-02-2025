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
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

export const ActiveLoansReport = () => {
    const [validities, setValidities] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const init = () => {
        setLoading(true);
        
        let apiCall;
        if (startDate && endDate) {
            apiCall = reportService.getValidityBetween(startDate, endDate);
        } else {
            apiCall = reportService.getValidity();
        }

        apiCall
            .then((response) => {
                console.log("Préstamos activos", response.data);
                setValidities(response.data);
            })
            .catch((error) => {
                console.log("Error al cargar préstamos activos", error);
                alert("Error al cargar el reporte: " + (error.response?.data?.message || error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        init();
    };

    const handleExport = () => {
        const headers = ["ID", "Cliente ID", "Herramienta ID", "Unidad ID", "Fecha Inicio", "Fecha Acordada", "Estado"];
        const csvData = validities.map(validity => [
            validity.loan?.id || '',
            validity.loan?.clientId || '',
            validity.loan?.toolId || '',
            validity.loan?.unitId || '',
            validity.loan?.initialDate || '',
            validity.loan?.agreedDate || '',
            validity.state || ''
        ]);
        
        const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prestamos-activos_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('es-CL');
    };

    const getStatusColor = (state) => {
        switch (state) {
            case 'VIGENTE': return 'success';
            case 'ATRASADO': return 'error';
            case 'POR_VENCER': return 'warning';
            default: return 'default';
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Reporte de Préstamos Activos</h2>
            <p>Lista de préstamos vigentes y atrasados</p>
            
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    id="startDate"
                    label="Fecha Inicio"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <TextField
                    id="endDate"
                    label="Fecha Fin"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={loading}
                    startIcon={<SearchIcon />}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleExport}
                    disabled={validities.length === 0}
                    startIcon={<DownloadIcon />}
                >
                    Exportar CSV
                </Button>
            </Box>

            {validities.length > 0 && (
                <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <strong>Resumen:</strong> {validities.length} préstamos encontrados
                    {startDate && endDate && ` entre ${formatDate(startDate)} y ${formatDate(endDate)}`}
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: "bold" }}>ID Préstamo</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Cliente ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Herramienta ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Unidad ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Fecha Inicio</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Fecha Acordada</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {validities.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    {loading ? "Cargando..." : "No hay préstamos activos en el período seleccionado"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            validities.map((validity) => (
                                <TableRow key={validity.loan?.id || 'unknown'} hover>
                                    <TableCell>{validity.loan?.id || 'N/A'}</TableCell>
                                    <TableCell>{validity.loan?.clientId || 'N/A'}</TableCell>
                                    <TableCell>{validity.loan?.toolId || 'N/A'}</TableCell>
                                    <TableCell>{validity.loan?.unitId || 'N/A'}</TableCell>
                                    <TableCell>{formatDate(validity.loan?.initialDate)}</TableCell>
                                    <TableCell>{formatDate(validity.loan?.agreedDate)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color={getStatusColor(validity.state)}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {validity.state || 'DESCONOCIDO'}
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