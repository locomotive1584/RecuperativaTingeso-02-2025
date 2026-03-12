import { IconButton } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { UnfoldingMenu } from "./UnfoldingMenu"

const TopBar = () => {
  const navigate = useNavigate()

  const egressOptions = [
    { label: "Lista de Egresos", to: "/egress/list" },
    { label: "Nuevo Egreso", to: "/egress/add" }
  ]

  const ingressOptions = [
    { label: "Lista de Ingresos", to: "/ingress/list" },
    { label: "Nuevo Ingreso", to: "/ingress/add" }
  ]

  const reportOptions = [
    { label: "Lista de Transacciones", to: "/reports/movements" }
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#c7c7c7" }}>
        <Toolbar>
          <UnfoldingMenu title="Egresos" options={egressOptions} />
          <UnfoldingMenu title="Ingresos" options={ingressOptions} />
          <UnfoldingMenu title="Reportes" options={reportOptions} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar