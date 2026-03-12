import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import egressService from "../services/egress.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const EgressList = () => {
    const [egressList, setEgressList] = useState([]);

    const loadEgress = () => {
        egressService.getAllSorted()
            .then(response => {
                setEgressList(response.data);
            })
            .catch(error => {
                console.error("Error al cargar egresos:", error);
            });
    };

    useEffect(() => {
        loadEgress();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <br />
            <Link to="/egress/add" style={{ textDecoration: "none", marginLeft: "1rem" }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    Nuevo Egreso
                </Button>
            </Link>
            <br /><br />
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo Doc</TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Número Doc</TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>Motivo</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Monto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {egressList.map((item, index) => (
                        <TableRow 
                            key={item.id}
                            sx={{ 
                                backgroundColor: (index + 1) % 3 === 0 ? '#e2e2e2' : 'inherit'
                            }}
                        >
                            <TableCell align="left">{item.date}</TableCell>
                            <TableCell align="left">{item.docType}</TableCell>
                            <TableCell align="left">{item.numDoc}</TableCell>
                            <TableCell align="left">{item.reason}</TableCell>
                            <TableCell align="right">{item.amount.toLocaleString('es-CL')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};