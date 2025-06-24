import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";
//Importacion de modals
import ModalPregunta from "./ModalPregunta.jsx";
import ModalAccRealizada from "./ModalAccRealizada.jsx";
const CrearEditar = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo,setTipo] = useState("");
  //Modals
  // Para modal de confirmación
  const [openPregunta, setOpenPregunta] = useState(false);
  const [mensajePregunta, setMensajePregunta] = useState("");
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});

  // Para modal de notificación
  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("success"); // o "error"
  // State for form values

  const [capacity, setCapacity] = useState(50);

  // Handle slider change
  const handleCapacityChange = (event, newValue) => {
    setCapacity(newValue);
  };
  const handleCrearEstacionamiento = async (e) => {
    e.preventDefault(); // Previene recarga del formulario


    const nuevoEstacionamiento = {
        Nombre:nombre,
        Tipo:tipo,
        Capacidad:capacity,
        Ubicacion:ubicacion,
        Descripcion:descripcion,      
      };
      console.log(capacity);

    try {
      const response = await fetch("http://localhost:4000/api/crear-estacionamiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEstacionamiento),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el estacionamiento.");
      }

      const result = await response.json();
      setMensajeNotificacion(result.message || "Vehículo eliminado con éxito.");
      setTipoNotificacion("success");
      setOpenNotificacion(true);

      console.log("Respuesta del servidor:", result);

      // Limpiar formulario
      setNombre("");
      setUbicacion("");
      setDescripcion("");
      setCapacity(50);
      setTipo("");

    } catch (err) {
      console.error("Error en la creación:", err);
      setMensajeNotificacion(err.message);
      setTipoNotificacion("error");
      setOpenNotificacion(true);
    } finally {
      setLoading(false); // Opcional
    }
  };


  return (
    <Box>
      <Header sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"/>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          bgcolor: "white",
          py: 4,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron-Bold, Helvetica",
            fontWeight: "bold",
            fontSize: "1.125rem",
          }}
        >
          Crear Nuevo Estacionamiento
        </Typography>

        <Divider sx={{ width: "403px" }} />

        {/* Form Fields */}
        <Stack spacing={4} sx={{ width: "100%", maxWidth: 361 }}>
          {/* Parking Name */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Nombre de estacionamiento
            </Typography>
            <TextField
              fullWidth
              placeholder="Ingresa el nombre del estacionamiento"
              variant="outlined"
              size="medium"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Box>

          {/* Parking Location */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Ubicación del estacionamiento
            </Typography>
            <TextField
              fullWidth
              placeholder="Ingresa la ubicacion del estacionamiento"
              variant="outlined"
              size="medium"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </Box>

          {/* Capacity */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Capacidad
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                0-100
              </Typography>
            </Box>
            <Slider
              value={capacity}
              onChange={handleCapacityChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  bgcolor: "#770275",
                },
                "& .MuiSlider-track": {
                  bgcolor: "#770275",
                },
                "& .MuiSlider-rail": {
                  bgcolor: "rgba(119, 2, 117, 0.3)",
                },
              }}
            />
          </Box>
          {/* Tipo */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Tipo de estacionamiento
            </Typography>
            <TextField
              fullWidth
              placeholder="Ingresa el tipo de estacionamiento (Motocicletas/Vehiculos)"
              variant="outlined"
              size="medium"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </Box>

          {/* Description and Rules */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Descripción y reglas del estacionamiento
            </Typography>
            <TextField
              fullWidth
              placeholder="Escribe aquí"
              variant="outlined"
              multiline
              minRows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Box>

          {/* Create Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                width: 160,
                height: 38,
                bgcolor: "#770275",
                borderRadius: "13px",
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                "&:hover": {
                  bgcolor: "#5c0159",
                },
              }}
              onClick={handleCrearEstacionamiento}
            >
              Crear
            </Button>
          </Box>
        </Stack>
      </Container>
      <AdminNav></AdminNav>
      <ModalPregunta
        open={openPregunta}
        onClose={() => setOpenPregunta(false)}
        mensaje={mensajePregunta}
        onConfirm={() => {
          setOpenPregunta(false);
          accionConfirmada();
        }}
      />
      
      <ModalAccRealizada
        open={openNotificacion}
        onClose={() => setOpenNotificacion(false)}
        mensaje={mensajeNotificacion}
        tipo={tipoNotificacion}
      />
    </Box>
  );
};

export default CrearEditar;