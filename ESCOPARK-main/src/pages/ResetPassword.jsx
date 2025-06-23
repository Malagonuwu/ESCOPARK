import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";

// imágenes
import fondo from "../assets/Cel.jpg";
import logo from "../assets/logo.png";

//Componentes
import Title from "../components/General/Title";

const ResetPassword = () => {
  const navigate = useNavigate();

  // Estados
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  // Validación correo
  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setErrorCorreo(value !== "ale@alumno.ipn.mx" && value !== "2022630679");
  };

  return (
    <Container
      sx={{
        width: "412px",
        height: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "125px",
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            width: "100%",
            height: "200px",
            top: "22px",
            bgcolor: "#333333ab",
            borderRadius: (theme) => theme.shape.borderRadius,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* FORM */}
          <Box
            sx={{
              px: 3,
            }}
          >
            {/* Boleta o correo */}
            <FormControl fullWidth>
              <Typography
                sx={{
                  fontFamily: "Audiowide, sans-serif",
                  fontWeight: 400,
                  color: "white",
                  fontSize: "13px",
                  mt: "65px",
                  mb: "2px",
                }}
              >
                Correo institucional o número de boleta
              </Typography>
              <TextField
                fullWidth
                value={correo}
                onChange={handleCorreoChange}
                placeholder="Ingrese su correo o boleta"
                error={errorCorreo}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "34px",
                    bgcolor: "white",
                    "& input": {
                      padding: "8px 16px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "grey",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#770275",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
              {errorCorreo && (
                <Typography
                  sx={{
                    mt: "2px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    color: "#ffa4fd",
                    fontSize: "10.5px",
                  }}
                >
                  Boleta o correo no registrados
                </Typography>
              )}
            </FormControl>
            {/* Botones de acción */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "gray",
                  fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 12,
                  width: "47%",
                  height: 36,
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#770275",
                  fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 12,
                  width: "47%",
                  height: 36,
                  "&:hover": {
                    bgcolor: "#770275",
                    boxShadow: "0 0 4px 1px rgb(193, 179, 193)",
                  },
                }}
                onClick={() => {
                  if (!errorCorreo && correo) {
                    console.log("Lógica pa mandar el correo");
                  }
                }}
              >
                Aceptar
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Título */}
        <Title
          text="RECUPERAR CONTRASEÑA"
          sx={{
            top: 5,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        />

        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            position: "relative",
            width: "270px",
            top: "220px",
            left: "50px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Container>
  );
};

export default ResetPassword;
