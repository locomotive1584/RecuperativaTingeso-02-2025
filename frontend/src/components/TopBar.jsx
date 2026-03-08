import { IconButton } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UnfoldingMenu } from "./UnfoldingMenu"

const TopBar = () =>{

    const navigate = useNavigate();

    const clientOptions = [
        {label: "Lista clientes", to: "/client/list"},
        {label: "Editar clientes", to: "/client/add"}
    ]

    const toolOptions = [
    {label: "Lista de Herramientas", to: "/tool/list"},
    {label: "Añadir Herramienta", to: "/tool/add"}
    ];

    const loanOptions = [
    {label: "Lista de Préstamos", to: "/loan/list"},
    {label: "Registrar Préstamo", to: "/loan/add"}
    ];

    const devolutionOptions = [
    {label: "Lista de Devoluciones", to: "/devolution/list"},
    {label: "Registrar Devolución", to: "/devolution/add"}
    ];

    const billOptions = [
    {label: "Gestión de Tarifas", to: "/bills/manage"}
    ];

    const kardexOptions = [
    {label: "Kardex de Herramientas", to: "/kardex/list"},
    {label: "Nuevo Registro", to: "/kardex/add"}
    ];

    const movementOptions = [
    {label: "Movimientos", to: "/movements/list"},
    {label: "Nuevo Movimiento", to: "/movements/add"}
    ];

    const reportOptions = [
    {label: "Préstamos Activos", to: "/reports/active-loans"},
    {label: "Clientes con Atrasos", to: "/reports/delayed-clients"},
    {label: "Herramientas Más Prestadas", to: "/reports/top-tools"}
    ];

    const unitOptions = [
    {label: "Lista de Unidades", to: "/unit/list"},
    {label: "Nueva Unidad", to: "/unit/add"},
    {label: "Crear Múltiples Unidades", to: "/unit/create-multiple"}
    ];

    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" sx={{backgroundColor:"#d79a01"}}>
                <Toolbar>
                    <Button
                        onClick={() => navigate("/client/add")}
                    >
                        <img
                            src="/ToolRent.jpg"
                            alt="ToolRent"
                            style={{width: 120, height: 80, marginRight: 50}}
                        />
                    </Button>
                    <UnfoldingMenu title="Clientes" options={clientOptions}/>
                    <UnfoldingMenu title="Herramientas" options={toolOptions}/>
                    <UnfoldingMenu title="Préstamos" options={loanOptions}/>
                    <UnfoldingMenu title="Devoluciones" options={devolutionOptions}/>
                    <UnfoldingMenu title="Tarifas" options={billOptions}/>
                    <UnfoldingMenu title="Kardex" options={kardexOptions}/>
                    <UnfoldingMenu title="Movimientos" options={movementOptions}/>
                    <UnfoldingMenu title="Reportes" options={reportOptions}/>
                    <UnfoldingMenu title="Unidades" options={unitOptions}/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar