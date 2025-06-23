import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// backend
import { supabase } from "../supabaseClient";

import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

// Imágenes
import fondo from "../assets/Cel.jpg";

// Componentes
import Title from "../components/General/Title";
import CustomButton from "../components/General/CustomButton";
import Condiciones from "../components/Login/Condiciones";
import AcceptModal from "../components/General/AcceptModal";

const Register = () => {
  const navigate = useNavigate();

  // Estados
  const [nombre, setNombre] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [career, setCareer] = useState("");
  const [boleta, setBoleta] = useState("");
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  // User type is always "Estudiante"
  const tipoUsuario = "Estudiante";

  // Validación nombre
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    const nombreValido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    setErrorNombre(!nombreValido.test(value));
  };

  // Validación correo
  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorCorreo(!correoValido.test(value));
  };

  // Validación contraseña
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorPassword(value.length < 8);
    setErrorConfirmPassword(value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrorConfirmPassword(password !== value);
  };

  // Toggle visibilidad contraseña
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const toggleShowConfirm = () => setShowConfirm((show) => !show);

  // Manejar el registro con la BD
  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: password,
      options: {
        data: {
          tipo_usuario: tipoUsuario,
          nombres: nombre,
          apellido_paterno: apellidoP,
          apellido_materno: apellidoM,
          numero_boleta: boleta,
          carrera: career,  
        },
      },
    });
  
    if (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error al registrar: " + error.message);
    } else {
      setShowAcceptModal(true);
    }
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
          width: "373px",
          height: "634px",
          top: "25px",
          right: 6,
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            width: "373px",
            height: "612px",
            top: "22px",
            bgcolor: "#333333ab",
            borderRadius: (theme) => theme.shape.borderRadius,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* FORM */}
          <Box
            sx={{
              px: 3,
            }}
          >
            {/* Nombre */}
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontFamily: "Audiowide, sans-serif",
                  fontWeight: 400,
                  color: "white",
                  fontSize: "13px",
                  my: "2px",
                }}
              >
                Nombre(s)
              </Typography>
              <TextField
                placeholder="Ingrese un nombre válido"
                error={errorNombre}
                value={nombre}
                onChange={handleNombreChange}
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
              {errorNombre && (
                <Typography
                  sx={{
                    mt: "2px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    color: "#ffa4fd",
                    fontSize: "10.5px",
                  }}
                >
                  Nombre inválido
                </Typography>
              )}
            </FormControl>
            {/* Apellidos */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ flex: 1, mt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  Apellido paterno
                </Typography>
                <TextField
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
                  value={apellidoP}
                  onChange={(e) => setApellidoP(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ flex: 1, mt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  Apellido materno
                </Typography>
                <TextField
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
                  value={apellidoM}
                  onChange={(e) => setApellidoM(e.target.value)}
                />
              </FormControl>
            </Box>
            {/* Carrera */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: "Audiowide, sans-serif",
                  fontWeight: 400,
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Carrera en curso
              </Typography>
              <Select
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                displayEmpty
                IconComponent={ArrowDropDownIcon}
                size="small"
                renderValue={(selected) =>
                  selected === "" ? "Seleccionar" : selected
                }
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiSelect-select": {
                    padding: "8px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "GREY",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#770275",
                    borderWidth: "2px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#770275",
                  },
                }}
              >
                <MenuItem value="" sx={{ color: "grey", fontSize: "13px" }}>
                  <em>Seleccionar</em>
                </MenuItem>
                <MenuItem
                  value="Ingeniería en Sistemas Computacionales"
                  sx={{ fontSize: "13px" }}
                >
                  Ingeniería en Sistemas Computacionales
                </MenuItem>
                <MenuItem
                  value="Ingeniería en Inteligencia Artificial"
                  sx={{ fontSize: "13px" }}
                >
                  Ingeniería en Inteligencia Artificial
                </MenuItem>
                <MenuItem
                  value="Licenciatura en Ciencia de Datos"
                  sx={{ fontSize: "13px" }}
                >
                  Licenciatura en Ciencia de Datos
                </MenuItem>
              </Select>
            </FormControl>
            {/* Boleta */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  No. de boleta
                </Typography>
                <TextField
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
                  value={boleta}
                  onChange={(e) => setBoleta(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  {/* Empty space to maintain layout */}
                </Typography>
                <Box sx={{ height: "36px" }}></Box>
              </FormControl>
            </Box>
            {/* Correo */}
            <FormControl fullWidth>
              <Typography
                sx={{
                  fontFamily: "Audiowide, sans-serif",
                  fontWeight: 400,
                  color: "white",
                  fontSize: "13px",
                  my: "2px",
                }}
              >
                Correo institucional
              </Typography>
              <TextField
                fullWidth
                value={correo}
                onChange={handleCorreoChange}
                placeholder="correo@alumno.ipn.mx"
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
                  Correo institucional no válido
                </Typography>
              )}
            </FormControl>

            {/* Contraseña y Confirmar */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ flex: 1, mt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  Contraseña
                </Typography>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  error={errorPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon sx={{ width: 20, height: 20 }} />
                          ) : (
                            <VisibilityOffIcon sx={{ width: 20, height: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "white",
                      "& input": {
                        padding: "8px 16px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#00000066",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#770275",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
                {errorPassword && (
                  <Typography
                    sx={{
                      mt: "2px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      color: "#ffa4fd",
                      fontSize: "10.5px",
                    }}
                  >
                    Al menos 8 caracteres
                  </Typography>
                )}
              </FormControl>

              <FormControl sx={{ flex: 1, mt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Audiowide, sans-serif",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "13px",
                    mb: "2px",
                  }}
                >
                  Confirmar
                </Typography>
                <TextField
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "white",
                      "& input": {
                        padding: "8px 16px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#00000066",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#770275",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={errorConfirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowConfirm} edge="end">
                          {showConfirm ? (
                            <VisibilityIcon sx={{ width: 20, height: 20 }} />
                          ) : (
                            <VisibilityOffIcon sx={{ width: 20, height: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorConfirmPassword && (
                  <Typography
                    sx={{
                      mt: "2px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      color: "#ffa4fd",
                      fontSize: "10.5px",
                    }}
                  >
                    Las contraseñas no coinciden
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Términos y condiciones */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#770275",
                  },
                }}
              />
              <Typography sx={{ fontSize: 12, color: "white", opacity: 0.7 }}>
                Acepto los{" "}
                <Box
                  component="span"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenTerms(true);
                  }}
                  sx={{
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  términos y condiciones
                </Box>
                .
              </Typography>
            </Box>
          </Box>

          {/* Botón y enlace final */}
          <Box sx={{ px: 2, pb: 2 }}>
            <CustomButton
              name="Registrarse"
              fullWidth
              onClick={handleRegister}
              disabled={
                !acceptTerms ||
                !nombre ||
                !apellidoP ||
                !apellidoM ||
                !career ||
                !boleta ||
                !correo ||
                !password ||
                !confirmPassword ||
                errorNombre ||
                errorCorreo ||
                errorPassword ||
                errorConfirmPassword
              }
            />

            {/* Link a Login */}
            <Typography
              align="center"
              sx={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                WebkitTextStroke: "0.5px #770275",
                color: "white",
              }}
            >
              Ya tengo una cuenta.{" "}
              <RouterLink
                to="/login"
                style={{
                  color: "#ffa4fd",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Ingresar
              </RouterLink>
            </Typography>
          </Box>
        </Paper>

        {/* Título */}
        <Title
          text="REGISTRO"
          sx={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>

      <Condiciones open={openTerms} onClose={() => setOpenTerms(false)} />

      {showAcceptModal && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AcceptModal
            title="¡Registro exitoso!"
            description="Bienvenido, tu cuenta ha sido registrada correctamente."
            label="Aceptar"
            onConfirm={() => {
              setShowAcceptModal(false);
              navigate("/login");
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default Register;