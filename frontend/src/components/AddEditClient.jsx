import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import clientService from "../services/client.service"

export const AddEditClient = () => {
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [state, setState] = useState("Activo");
    const [email, setEmail] = useState("");
    const {id} = useParams("");
    const [titleClientForm, setTitleClientForm] = useState("");
    const navigate = useNavigate();

    const saveClient = (c) => {

      c.preventDefault();

      const client = {rut, name, contact, email, id};

      if(rut==""||name==""||contact==""||email==""){
        console.log("ERROR: Cliente sin datos", error)
      }

      else if(id){
        clientService
          .update(client)
          .then((response) =>{
            console.log("Cliente actualizado.", response.data);
            {/*navigate("/client/list");*/}
            }
          )
          .catch((error) =>{
            console.log("No se pudo actualizar el cliente", error)
          }
        );
      } else {
        clientService
          .create(client)
          .then((response) =>{
            console.log("Cliente añadido al sistema", response);
            {/*navigate("/client/list");*/}
          }
        )
        .catch((error) =>{
          console.log("No se pudo registrar el nuevo cliente", error);
        }
      );
      }
    };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleClientForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="rut"
            label="Rut"
            value={rut}
            variant="standard"
            onChange={(c) => setRut(c.target.value)}
            helperText="Ej. 12.587.698-8"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="name"
            label="Name"
            value={name}
            variant="standard"
            onChange={(c) => setName(c.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="contact"
            label="contact"
            value={contact}
            variant="standard"
            onChange={(c) => setContact(c.target.value)}
            helperText="Numero de telefono"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="email"
            label="email"
            value={email}
            variant="standard"
            onChange={(c) => setEmail(c.target.value)}
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(c) => saveClient(c)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/client/list">Back to List</Link>
    </Box>
  );
}