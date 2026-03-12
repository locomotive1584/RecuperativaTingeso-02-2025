import { useEffect, useState } from "react";
import reportService from "../services/report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, TextField, Button, Alert, Snackbar } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const ReportList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [totals, setTotals] = useState({ totalIngresos: 0, totalEgresos: 0 });

    useEffect(() => {
        loadAllTransactions();
    }, []);

    const loadAllTransactions = () => {
        reportService.getAllTransactions()
            .then(response => {
                const sorted = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setTransactions(sorted);
                setFilteredTransactions(sorted);
                calcularTotales(sorted);
            })
            .catch(error => {
                console.error("Error al cargar transacciones:", error);
            });
    };

    const calcularTotales = (data) => {
        let totalIng = 0;
        let totalEgr = 0;
        data.forEach(item => {
            if (item.egress) {
                totalEgr += item.amount;
            } else {
                totalIng += item.amount;
            }
        });
        setTotals({ totalIngresos: totalIng, totalEgresos: totalEgr });
    };

    const handleFilter = () => {
        if (fromDate && toDate && fromDate > toDate) {
            setError("La fecha 'Desde' no puede ser mayor que 'Hasta'");
            setOpenSnackbar(true);
            return;
        }
        setError("");
        // Llamar al servicio con filtro
        reportService.getTransactionsFiltered(fromDate || null, toDate || null)
            .then(response => {
                const sorted = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setFilteredTransactions(sorted);
                calcularTotales(sorted);
            })
            .catch(error => {
                console.error("Error al filtrar:", error);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Calcular saldo acumulado sobre las transacciones filtradas
    const calcularSaldo = () => {
        let saldo = 0;
        return filteredTransactions.map((item) => {
            if (item.egress) {
                saldo -= item.amount;
            } else {
                saldo += item.amount;
            }
            return { ...item, saldo };
        });
    };

    const filasConSaldo = calcularSaldo();

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <TextField
                    label="Desde"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <TextField
                    label="Hasta"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <Button
                    variant="contained"
                    startIcon={<FilterAltIcon />}
                    onClick={handleFilter}
                >
                    Filtrar
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table
                    sx={{
                        minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                            <TableCell align="left" sx={{ fontWeight: "bold", borderRight: '1px solid #ccc' }}>Nro</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo Doc</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Num Doc</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold", borderRight: '1px solid #ccc' }}>Motivo</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Ingreso</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Salida</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Saldo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filasConSaldo.map((item, index) => (
                            <TableRow key={item.id || index}
                                    sx={{ 
                                    backgroundColor: (index + 1) % 3 === 0 ? '#e2e2e2' : 'inherit'
                                }}
                            >
                                <TableCell align="left" sx={{ borderRight: '1px solid #ccc' }}>{index + 1}</TableCell>
                                <TableCell align="left">{item.date}</TableCell>
                                <TableCell align="left">{item.docType || ''}</TableCell>
                                <TableCell align="left">{item.numDoc}</TableCell>
                                <TableCell align="left" sx={{ borderRight: '1px solid #ccc' }}>{item.reason || ''}</TableCell>
                                <TableCell align="right">
                                    {!item.egress ? item.amount.toLocaleString('es-CL') : ''}
                                </TableCell>
                                <TableCell align="right">
                                    {item.egress ? item.amount.toLocaleString('es-CL') : ''}
                                </TableCell>
                                <TableCell align="right">{item.saldo.toLocaleString('es-CL')}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ borderTop: '2px solid #ccc', backgroundColor: '#f0f0f0' }}>
                            <TableCell align="left" sx={{ borderRight: '1px solid #ccc' }} colSpan={5}></TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {totals.totalIngresos.toLocaleString('es-CL')}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {totals.totalEgresos.toLocaleString('es-CL')}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};