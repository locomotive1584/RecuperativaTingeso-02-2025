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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import BarChartIcon from "@mui/icons-material/BarChart";

export const TopToolsReport = () => {
    const [popularities, setPopularities] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const init = () => {
        setLoading(true);
        
        let apiCall;
        if (startDate && endDate) {
            apiCall = reportService.getPopularToolsBetween(startDate, endDate);
        } else {
            apiCall = reportService.getPopularTools();
        }

        apiCall
            .then((response) => {
                console.log("Ranking de herramientas", response.data);
                setPopularities(response.data);
            })
            .catch((error) => {
                console.log("Error al cargar ranking", error);
                alert("Error al cargar el reporte: " + (error.response?.data?.message || error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
        init();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        init();
    };

    const getPopularityLevel = (rank) => {
        if (rank === 1) return { icon: <StarIcon sx={{ color: '#ffd700' }} />, bgColor: '#fff8e1' };
        if (rank <= 3) return { icon: <TrendingUpIcon sx={{ color: '#4caf50' }} />, bgColor: '#e8f5e8' };
        return { icon: <BarChartIcon sx={{ color: '#2196f3' }} />, bgColor: '#ffffff' };
    };

    const calculatePercentage = (toolLoans, totalLoans) => {
        if (totalLoans === 0) return 0;
        return ((toolLoans / totalLoans) * 100).toFixed(1);
    };

    const totalLoans = popularities.reduce((sum, popularity) => sum + (popularity.loanQuantity || 0), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Ranking de Herramientas Más Prestadas</h2>
            <p>Análisis de popularidad y demanda de herramientas</p>
            
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Fecha Inicio"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <TextField
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
            </Box>

            {popularities.length > 0 && (
                <Box sx={{ mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUpIcon color="primary" />
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#666' }}>Total Préstamos</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalLoans}</div>
                            </div>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <StarIcon sx={{ color: '#ffd700' }} />
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#666' }}>Herramienta #1</div>
                                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    {popularities[0]?.tool?.name || 'N/A'}
                                </div>
                            </div>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 2, flex: 1, minWidth: 200 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BarChartIcon color="secondary" />
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#666' }}>Periodo Analizado</div>
                                <div style={{ fontSize: '1rem' }}>
                                    {startDate} a {endDate}
                                </div>
                            </div>
                        </Box>
                    </Paper>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: "bold", width: 80 }}>Posición</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Herramienta</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">Préstamos</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">% del Total</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">Stock</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">Costo Diario</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">Multa Diaria</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {popularities.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    {loading ? "Cargando..." : "No hay datos para el período seleccionado"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            popularities.map((popularity, index) => {
                                const tool = popularity.tool || {};
                                const percentage = calculatePercentage(popularity.loanQuantity, totalLoans);
                                const popularityLevel = getPopularityLevel(index + 1);

                                return (
                                    <TableRow 
                                        key={tool.id || index} 
                                        hover 
                                        sx={{ 
                                            backgroundColor: popularityLevel.bgColor,
                                            '&:hover': { backgroundColor: '#f0f0f0' }
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {popularityLevel.icon}
                                                <span style={{ 
                                                    fontSize: '1.2rem', 
                                                    fontWeight: 'bold',
                                                    color: index < 3 ? '#1976d2' : '#666'
                                                }}>
                                                    #{index + 1}
                                                </span>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <strong>{tool.name || 'N/A'}</strong>
                                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                                                ID: {tool.id || 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell>{tool.category || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            <span style={{ 
                                                fontSize: '1.1rem', 
                                                fontWeight: 'bold',
                                                color: popularity.loanQuantity > 10 ? '#2e7d32' : '#1976d2'
                                            }}>
                                                {popularity.loanQuantity || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ 
                                                bgcolor: '#e3f2fd', 
                                                borderRadius: 1,
                                                p: 0.5,
                                                display: 'inline-block'
                                            }}>
                                                {percentage}%
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {tool.stock || 0}
                                        </TableCell>
                                        <TableCell align="center">
                                            ${tool.dailyCost?.toLocaleString() || 'N/A'}
                                        </TableCell>
                                        <TableCell align="center">
                                            ${tool.dailyFine?.toLocaleString() || 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};