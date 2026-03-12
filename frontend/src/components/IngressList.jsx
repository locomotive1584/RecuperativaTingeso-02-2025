import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ingressService from "../services/ingress.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const IngressList = () => {
    const [ingressList, setIngressList] = useState([]);

    const loadIngress = () => {
        ingressService.getAllSorted()
            .then(response => {
                setIngressList(response.data);
            })
            .catch(error => {
                console.error("Error al cargar ingresos:", error);
            });
    };

    useEffect(() => {
        loadIngress();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <br />
            <Link to="/ingress/add" style={{ textDecoration: "none", marginLeft: "1rem" }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    Nuevo Ingreso
                </Button>
            </Link>
            <br /><br />
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Número Doc</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Monto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingressList.map((item, index) => (
                        <TableRow 
                            key={item.id}
                            sx={{ 
                                backgroundColor: (index + 1) % 3 === 0 ? '#e2e2e2' : 'inherit'
                            }}
                        >
                            <TableCell align="left">{item.date}</TableCell>
                            <TableCell align="left">{item.numDoc}</TableCell>
                            <TableCell align="right">{item.amount.toLocaleString('es-CL')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};