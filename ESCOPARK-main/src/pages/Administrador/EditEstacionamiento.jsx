import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";
import ModalPregunta from "./ModalPregunta.jsx";
import ModalAccRealizada from "./ModalAccRealizada.jsx";

const EditEstacionamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState(50);
  const [tipo,setTipo]= useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openPregunta, setOpenPregunta] = useState(false);
  const [mensajePregunta, setMensajePregunta] = useState("");
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});

  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("success");

  useEffect(() => {
    const fetchEstacionamiento = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/get-estacionamientoIndividual/${id}`);
        if (!res.ok) throw new Error("Error al obtener estacionamiento");
        const data = await res.json();
        setNombre(data.Nombre);
        setUbicacion(data.Ubicacion);
        setDescripcion(data.Descripcion);
        setCapacidad(data.Capacidad);
        setTipo(data.Tipo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEstacionamiento();
  }, [id]);

  const handleUpdateEstacionamiento = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/update-estacionamiento/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nombre:nombre, Tipo:tipo,Capacidad:capacidad,Descripcion:descripcion,Ubicacion:ubicacion }),
      });

      if (!res.ok) throw new Error("Error al actualizar estacionamiento");
      setMensajeNotificacion("Estacionamiento actualizado correctamente");
      setTipoNotificacion("success");
      setOpenNotificacion(true);
    } catch (err) {
      setMensajeNotificacion(err.message);
      setTipoNotificacion("error");
      setOpenNotificacion(true);
    }
  };

  const handleDeleteEstacionamiento = () => {
    setMensajePregunta("¿Estás seguro de que deseas eliminar este estacionamiento?");
    setAccionConfirmada(() => async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/delete-estacionamiento/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Error al eliminar estacionamiento");
        setMensajeNotificacion("Estacionamiento eliminado correctamente");
        setTipoNotificacion("success");
        setOpenNotificacion(true);
        navigate("/Estacionamientos");
      } catch (err) {
        setMensajeNotificacion(err.message);
        setTipoNotificacion("error");
        setOpenNotificacion(true);
      }
    });
    setOpenPregunta(true);
  };

  return (
    <Box>
      <Header sectionTitle="Estacionamientos" userName="Administrador" showAvatar={false} backgroundColor="rgba(119, 2, 117, 0.77)" />
      <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "white" }}>
        <Paper elevation={0} sx={{ width: "440px", p: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: "Orbitron-Bold, Helvetica", fontWeight: "bold", mb: 2 }}>
            Editar Estacionamiento
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            <TextField label="Nombre" fullWidth value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <TextField label="Ubicación" fullWidth value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            <TextField label="Tipo" fullWidth value={tipo} onChange={(e) => setTipo(e.target.value)} />
            <TextField label="Descripción" fullWidth value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <TextField label="Capacidad" fullWidth type="number" value={capacidad} onChange={(e) => setCapacidad(Number(e.target.value))} />
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="contained" sx={{ bgcolor: "#0090a4" }} onClick={handleUpdateEstacionamiento}>Guardar</Button>
            <Button variant="contained" sx={{ bgcolor: "#770275" }} onClick={handleDeleteEstacionamiento}>Eliminar</Button>
          </Box>
        </Paper>
      </Box>

      <AdminNav />
      <ModalPregunta open={openPregunta} onClose={() => setOpenPregunta(false)} mensaje={mensajePregunta} onConfirm={() => { setOpenPregunta(false); accionConfirmada(); }} />
      <ModalAccRealizada open={openNotificacion} onClose={() => setOpenNotificacion(false)} mensaje={mensajeNotificacion} tipo={tipoNotificacion} />
    </Box>
  );
};

export default EditEstacionamiento;
