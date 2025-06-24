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
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";
//Importacion de modals
import ModalPregunta from "./ModalPregunta.jsx";
import ModalAccRealizada from "./ModalAccRealizada.jsx";
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
    name: "password",
  },
];

const RegistroDePolicias = () => {
  //Modals
  // Para modal de confirmación
  const [openPregunta, setOpenPregunta] = useState(false);
  const [mensajePregunta, setMensajePregunta] = useState("");
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});

  // Para modal de notificación
  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("success"); // o "error"
  const [formData, setFormData] = useState({
    tipo_usuario: "Policia",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    correo: "",
    idNumber: "",
    password: "",
  });
  const limpiarFormulario = () => {
    setFormData({
      tipo_usuario: "Policia",
      name: "",
      paternalLastName: "",
      maternalLastName: "",
      correo: "",
      idNumber: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Función para manejar el registro del policía
  const handleRegisterPolice = async () => {
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
      setMensajeNotificacion(err.message);
      setTipoNotificacion("error");
      setOpenNotificacion(true);
    } else {
      setMensajeNotificacion("Guardia creado con exito.");
      setTipoNotificacion("success");
      setOpenNotificacion(true);
      // Limpia los campos del formulario
      limpiarFormulario();
    }
  };
  return (
    <Box>
      <Header
        sectionTitle="Guardias"
        userName="Administrador"
        showAvatar={false}
        backgroundColor="rgb(119, 2, 117)"
        showBackgroundImage={false}
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
          <Stack spacing={2} sx={{ mt: 2, mx: 4 }}>
            {formFields.map((field) => (
              <Box key={field.id}>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "bold",
                    fontSize: "14px",
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
                      height: "45px",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>

          {/* Register Button */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3.5 }}
          >
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
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              onClick={handleRegisterPolice}
            >
              Registrar
            </Button>
          </Box>
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
      />
    </Box>
  );
};

export default RegistroDePolicias;
