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

const CrearEditar = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo,setTipo] = useState("");
  // State for form values

  const [capacity, setCapacity] = useState([0, 100]);

  // Handle slider change
  const handleCapacityChange = (event, newValue) => {
    setCapacity(newValue);
  };
  const handleCrearEstacionamiento = async (e) => {
    e.preventDefault(); // Previene recarga del formulario


    const nuevoEstacionamiento = {
        Nombre:nombre,
        Tipo:tipo,
        Capacidad:capacity[1],
        Ubicacion:ubicacion,
        Descripcion:descripcion,      
      };

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
      alert("Estacionamiento creado con éxito");
      console.log("Respuesta del servidor:", result);

      // Limpiar formulario
      setNombre("");
      setUbicacion("");
      setDescripcion("");
      setCapacity([0, 100]);
      setTipo("");

    } catch (err) {
      console.error("Error en la creación:", err);
      setError(err.message); // Opcional: si tienes UI para mostrar errores
    } finally {
      setLoading(false); // Opcional
    }
  };


  return (
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
      {/* Header */}
      <Box sx={{ width: "100%", position: "relative", mb: 2 }}>
        <Box
          sx={{
            position: "relative",
            height: 179,
            backgroundImage: "url(./aver-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 72,
              backgroundImage: "url(./header.svg)",
              backgroundSize: "cover",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: 27,
              left: 0,
              color: "white",
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "1.125rem",
            }}
          >
            Administrador
          </Typography>

          <Box
            sx={{
              position: "absolute",
              top: 13,
              right: 70,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src="./image-3.png"
              alt="User"
              sx={{ width: 45, height: 45 }}
            />
            <Typography
              sx={{
                color: "white",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "15px",
                ml: 1,
              }}
            >
              ad
            </Typography>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Box>
        </Box>
      </Box>

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
  );
};

export default CrearEditar;