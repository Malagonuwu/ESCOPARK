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
  const [tipo, setTipo] = useState("");
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
      Nombre: nombre,
      Tipo: tipo,
      Capacidad: capacity,
      Ubicacion: ubicacion,
      Descripcion: descripcion,
    };
    console.log(capacity);

    try {
      const response = await fetch(
        "http://localhost:4000/api/crear-estacionamiento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoEstacionamiento),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error al crear el estacionamiento."
        );
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
      <Header
        sectionTitle="Estacionamientos"
        userName="Administrador"
        showAvatar={false}
        showBackgroundImage={false}
        backgroundColor="rgb(119, 2, 117)"
      />
      <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "white" }}>
        <Container
          maxWidth={false}
          sx={{
            width: "440px",
            height: "956px",
            position: "relative",
            overflow: "hidden",
            bgcolor: "white",
            p: 0,
          }}
        >
          {/* Form Title */}
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              ml: 2.5,
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Registrar Nuevo Policia
          </Typography>

          <Divider sx={{ mt: 1, mx: 2 }} />
          {/* Form Fields */}
          <Stack
            spacing={3}
            sx={{
              width: "100%",
              maxWidth: 300,
              mx: 4,
              mt: 2,
            }}
          >
            {/* Parking Name */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  fontSize: "14px",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "45px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  },
                }}
              />
            </Box>

            {/* Parking Location */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  fontSize: "14px",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "45px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  },
                }}
              />
            </Box>

            {/* Capacity */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Capacidad
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "bold",
                    fontSize: "14px",
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
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Tipo de estacionamiento
              </Typography>
              <TextField
                fullWidth
                placeholder="Tipo de estacionamiento (Motos/Vehiculos)"
                variant="outlined"
                size="medium"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "45px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  },
                }}
              />
            </Box>

            {/* Description and Rules */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Descripción y reglas del estacionamiento
              </Typography>
              <TextField
                fullWidth
                placeholder="Escribe aquí"
                variant="outlined"
                multiline
                minRows={2}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Box>

            {/* Create Button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                  marginBottom: 4.5,
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
          <AdminNav />
        </Container>
      </Box>

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
        showImage={false}
      />
    </Box>
  );
};

export default CrearEditar;
