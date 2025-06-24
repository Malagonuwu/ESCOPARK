import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import React ,{ useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";
const formFields = [
  {
    id: "name",
    label: "Nombre (s)",
    placeholder: "Ingresa el nombre del policía",
    type: "text",
    name: "name", // Añadir 'name' para mapear a formData
  },
  {
    id: "paternalLastName",
    label: "Apellido Paterno",
    placeholder: "Ingresa el apellido paterno",
    type: "text",
    name: "paternalLastName",
  },
  {
    id: "maternalLastName",
    label: "Apellido Materno",
    placeholder: "Ingresa el apellido materno",
    type: "text",
    name: "maternalLastName",
  },
  {
    id: "correo", 
    label: "Correo Electrónico",
    placeholder: "Ingresa el correo electrónico",
    type: "email",
    name: "correo",
  },
  {
    id: "idNumber",
    label: "Número ID o Cédula",
    placeholder: "Ingresa la cédula de identificación",
    type: "text",
    name: "idNumber",
  },
  {
    id: "password",
    label: "Contraseña", 
    placeholder: "Ingresa la contraseña",
    type: "password", 
    name: "password"
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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Función para manejar el registro del policía
  const handleRegisterPolice = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/register-policia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error desconocido al registrar el policía.");
      }

      const result = await response.json();
      alert("Policía registrado exitosamente.");
      console.log("Registro exitoso:", result);

      // Limpiar el formulario después de un registro exitoso
      setFormData({
        tipo_usuario : "Policia",
        name: "",
        paternalLastName: "",
        maternalLastName: "",
        correo: "",
        idNumber: "",
        password:""
      });
      setTimeout(() => {
        
      }, 2000); // 2 segundos para ver el mensaje de éxito

    } catch (err) {
      console.error("Error en el registro del policía:", err);
   
    } finally {
      
    }
  };
  return (
    <Box>
        <Header sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"/>
        <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "white"}}>
        

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
              fontSize: "18px"
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
                    fontFamily: "Orbitron-Bold, Helvetica",
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
                  type={field.type} 
                  name={field.name} 
                  value={formData[field.name]}
                  onChange={handleChange} // Maneja los cambios del input
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
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)"
              }}
              onClick={handleRegisterPolice}
            >
              Registrar
            </Button>
          </Box>
        </Container>
        </Box>
        <AdminNav/>
    </Box>
    
  );
};

export default RegistroDePolicias;