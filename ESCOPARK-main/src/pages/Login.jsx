import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
// Para el backend
import { supabase } from "../supabaseClient";
import { useNavigate } from 'react-router-dom';



// Imágenes
import fondo from "../assets/Cel.jpg";
import logo from "../assets/logo.png";

//Componentes
import CustomButton from "../components/General/CustomButton";
import Title from "../components/General/Title";
import EmailField from "../components/Login/EmailField";
import PasswordField from "../components/Login/PasswordField";

const Login = () => {
  // Estados
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

// Función backend 
const navigate = useNavigate(); // para redireccionar después del login
const handleLogin = async () => {
  if (!correo || !password) {
    setErrorCorreo(!correo);
    setErrorPassword(!password);
    return;
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: correo.trim(),
    password: password.trim(),
  });

  console.log("Auth:", authData);
  if (authError) {
    alert("Error de login: " + authError.message);
    return;
  }

  const user = authData.user;

  // Ahora buscar en la tabla Usuarios
  const { data: perfil, error: perfilError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id_usuario", user.id)
    .single();

  if (perfilError) {
    alert("Error al obtener datos del usuario: " + perfilError.message);
    return;
  }

  console.log("Perfil completo:", perfil);

  // Puedes guardar el perfil en localStorage, context, Redux, etc.
  localStorage.setItem("perfil", JSON.stringify(perfil));

  alert(`Bienvenido ${perfil.nombres}`);

  switch (perfil.tipo_usuario) {
    case "Estudiante":
    navigate("/home-estudiante");
      break;
    case "Profesor":
      navigate("/home-profesor");
      break;
    case "Administrativo":
      navigate("/home-administrativo");
      break;
    case "Policia":
      navigate("/home-policia");
      break;
    default:
      navigate("/home");
      break;
  }

  localStorage.setItem("tipo_usuario", perfil.tipo_usuario);
  const tipoUsuario = localStorage.getItem("tipo_usuario");


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
          }}
        >
          {/* Campo correo */}
          <EmailField
            correo={correo}
            setCorreo={setCorreo}
            errorCorreo={errorCorreo}
            setErrorCorreo={setErrorCorreo}
          />

          {/* Campo contraseña */}
          <PasswordField
            password={password}
            setPassword={setPassword}
            errorPassword={errorPassword}
            setErrorPassword={setErrorPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Botón Ingresar */}
          <Box
            sx={{
              position: "absolute",
              width: "252px",
              height: "32px",
              top: "480px",
              left: "61px",
            }}
          >
            // Boton que une la el front con el back
            <CustomButton name="Ingresar" fullWidth onClick={handleLogin} /> 

          </Box>

          {/* Link a Registro */}
          <Typography
            sx={{
              position: "absolute",
              top: "530px",
              left: "50px",
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              WebkitTextStroke: "0.5px #770275",
            }}
          >
            <Box component="span" sx={{ color: "white" }}>
              ¿Aún no tienes una cuenta?{" "}
            </Box>
            <Link
              to="/register"
              style={{
                color: "#ffa4fd",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Registrarse
            </Link>
          </Typography>
        </Paper>

        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            position: "absolute",
            width: "294px",
            top: "50px",
            left: "40px",
            objectFit: "cover",
          }}
        />

        {/* Título */}
        <Title text="INICIAR SESIÓN" sx={{ left: "60px" }} />

        {/* Recuperar contraseña */}
        <Link to="/reset-password">
          <HelpOutlineIcon
            sx={{
              position: "absolute",
              width: "40px",
              top: "443px",
              left: "315px",
              color: "#ffa4fd",
            }}
          />
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
