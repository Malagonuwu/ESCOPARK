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
import NavegationBar from "../../components/General/AdminNav";
import Header from "../../components/General/Header";

const CrearEditar = () => {
  // State for form values
  const [capacity, setCapacity] = useState(50);

  // Handle slider change
  const handleCapacityChange = (event, newValue) => {
    setCapacity(newValue);
  };

  return (
    
    <Box sx={{
      display:"flex", 
      flexDirection:"column", 
      minHeight:"100vh", 
      width:"100%",
      margin: 0,
      padding: 0,
      backgroundColor: "White",
      overflowX: "hidden"
    }}>
        {/* Header */}
        <Header
          sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"
        />
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            bgcolor: "white",
            py: 4,
            px: 2
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
          Crear/Editar Estacionamiento
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
              placeholder="Ingresa el nombre del policia"
              variant="outlined"
              size="medium"
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
              placeholder="Ingrese la ubicación del estacionamiento"
              variant="outlined"
              size="medium"
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
            >
              Crear
            </Button>
          </Box>
        </Stack>
        </Container>
        <NavegationBar 
          sx={{width:"100%"}}
        />
    </Box>
  );
};

export default CrearEditar;