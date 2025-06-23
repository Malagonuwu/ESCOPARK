import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";

const formFields = [
  {
    id: "name",
    label: "Nombre (s)",
    placeholder: "Ingresa el nombre del policia",
  },
  {
    id: "paternalLastName",
    label: "Apellido Paterno",
    placeholder: "Ingresa el apellido paterno",
  },
  {
    id: "maternalLastName",
    label: "Apellido Materno",
    placeholder: "Ingresa el apellido materno",
  },
  {
    id: "correo",
    label: "Correo",
    placeholder: "Ingresa el correo electronico",
  },
  {
    id: "idNumber",
    label: "Numero id O cédula",
    placeholder: "Ingresa la cédula de identificación",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Ingresa la contraseña",
  },
];

const RegistroDePolicias = () => {
  const [formData, setFormData] = useState({
    tipo_usuario : "Policia",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    correo: "",
    idNumber: "",
    password:""
  });
  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.correo,
      password: formData.password,
      options: {
        data: {
          tipo_usuario: formData.tipo_usuario, 
          nombres: formData.name,
          apellido_paterno: formData.paternalLastName,
          apellido_materno: formData.maternalLastName,
          numero_boleta: formData.tipoUsuario === "Estudiante" ? boleta : null,
          carrera: formData.tipoUsuario === "Estudiante" ? career : null,  
        },
      },
    });
  
    if (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error al registrar: " + error.message);
    } else {
      alert("Registro exitoso. Revisa tu correo para confirmar la cuenta.");
      
    }
  };
  const navigate = useNavigate();
  return (
    <Box>
      <Header sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"/>
      <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "white", marginBottom:"0"}}>
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
              fontFamily: "Orbitron, Sans-Serif",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Registrar Nuevo Policia
          </Typography>

          <Divider sx={{ mt: 1, mx: 2 }} />

          {/* Form Fields */}
          <Stack spacing={2} sx={{ mt: 3, mx: 5 }}>
            {formFields.map((field) => (
              <Box key={field.id}>
                <Typography
                  sx={{
                    fontFamily: "Orbitron, Sans-Serif",
                    fontWeight: "bold",
                    fontSize: "16px",
                    mb: 1,
                  }}
                >
                  {field.label}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={field.placeholder}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>

          {/* Register Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                width: "160px",
                height: "38px",
                bgcolor: "#770275",
                borderRadius: "13px",
                fontFamily: "Orbitron, Sans-Serif",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              onClick={handleRegister}
            >
              Registrar
            </Button>
          </Box>
        </Container>
      </Box>
      <NavegationBar>

      </NavegationBar>
    </Box>
    
  );
};

export default RegistroDePolicias;
