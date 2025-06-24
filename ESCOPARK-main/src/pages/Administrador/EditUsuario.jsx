import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React ,{ useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";

// In a real implementation, these would be imported from your assets
// Using placeholder URLs for demonstration
const headerImage = "header.svg";
const avatarImage = "image-3.png";
const carImage = "MIAUTOGDL-79-876x535-2.png";

//Importacion de modals
import ModalPregunta from "./ModalPregunta.jsx";
import ModalAccRealizada from "./ModalAccRealizada.jsx";

const EdicionDeUsuarios = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [boleta, setBoleta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  //Modals
  // Para modal de confirmación
  const [openPregunta, setOpenPregunta] = useState(false);
  const [mensajePregunta, setMensajePregunta] = useState("");
  const [accionConfirmada, setAccionConfirmada] = useState(() => () => {});

  // Para modal de notificación
  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("success"); // o "error"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia el estado de carga
      setError(null); // Limpia errores anteriores

      try {
        // --- Petición para obtener los datos de un solo usuario ---
        const userResponse = await fetch(`http://localhost:4000/api/get-user/${id}`);
        if (!userResponse.ok) {
          // Si la respuesta no es OK (ej. 404, 500), lanza un error
          const errorData = await userResponse.json();
          throw new Error(errorData.error || "Error al obtener usuario");
        }
        const userDataFromBackend = await userResponse.json();
        setUserData(userDataFromBackend);
        console.log("Datos del usuario:", userDataFromBackend);

        // Actualiza los estados de los campos del formulario con los datos del usuario
        setNombre(userDataFromBackend.nombres || "");
        setBoleta(userDataFromBackend.numero_boleta || "");
        setTelefono(userDataFromBackend.telefono || "");
        setCorreo(userDataFromBackend.correo_institucional || "");

        // --- Petición para obtener los vehículos del usuario ---
        const vehiclesResponse = await fetch(`http://localhost:4000/api/get-user-vehicles/${id}`);
        if (!vehiclesResponse.ok) {
          const errorData = await vehiclesResponse.json();
          throw new Error(errorData.error || "Error al obtener vehículos");
        }
        const vehicleDataFromBackend = await vehiclesResponse.json();
        setVehicleData(vehicleDataFromBackend);
        console.log("Vehículos del usuario:", vehicleDataFromBackend);

      } catch (err) {
        console.error("Error en la petición:", err.message);
        setError(err.message); // Guarda el mensaje de error en el estado
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  // Función para manejar la actualización del usuario
  const handleUpdateUser = async (e) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario

      setLoading(true);
      setError(null);
      

      const updatedData = {
        nombres:nombre,
        correo_institucional: correo,
      };

      try {
        const response = await fetch(`http://localhost:4000/api/update-user/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al actualizar el usuario.");
        }

        const result = await response.json();
        setMensajeNotificacion("Usuario actualizado con éxito.");
        setTipoNotificacion("success");
        setOpenNotificacion(true);

        console.log("Usuario actualizado:", result);


      } catch (err) {
        console.error("Error en la actualización:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    //Handle para la eliminacion de un usuario
    const handleDeleteUser = () => {
    setMensajePregunta("¿Estás seguro de que deseas eliminar a este usuario?");
    setAccionConfirmada(() => async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/delete-user/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al eliminar usuario.");
        }

        const result = await response.json();
        setMensajeNotificacion(result.message || "Usuario eliminado con éxito.");
        setTipoNotificacion("success");
        setOpenNotificacion(true);
        navigate("/gestion-usuarios");
      } catch (err) {
        console.error("Error al eliminar usuario:", err.message);
        setMensajeNotificacion(err.message);
        setTipoNotificacion("error");
        setOpenNotificacion(true);
      }
    });

    setOpenPregunta(true);
  };

  const handleDeleteVehicle = (placasAEliminar) => {
    setMensajePregunta(`¿Deseas eliminar el vehículo con placas ${placasAEliminar}?`);
    setAccionConfirmada(() => async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/delete-vehicle`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_usuario: id, placas: placasAEliminar }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al eliminar el vehículo.");
        }

        const result = await response.json();
        setMensajeNotificacion(result.message || "Vehículo eliminado con éxito.");
        setTipoNotificacion("success");
        setOpenNotificacion(true);

        // Actualiza lista de vehículos
        setVehicleData((prev) => prev.filter((v) => v.placas !== placasAEliminar));
      } catch (err) {
        console.error("Error al eliminar vehículo:", err.message);
        setMensajeNotificacion(err.message);
        setTipoNotificacion("error");
        setOpenNotificacion(true);
      }
    });

    setOpenPregunta(true);
  };


  return (
    <Box sx={{width:"100%", height:"100vh"}}>
      <Header sectionTitle="Estacionamientos"
              userName="Administrador"
              showAvatar={false}
              backgroundColor="rgba(119, 2, 117, 0.77)"/>
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "440px",
          height: "956px",
          position: "relative",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        {/* Main Content */}
        <Container sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "18px",
              mb: 2,
            }}
          >
            Editar usuario
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Form Fields */}
          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Nombre de usuario
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>
            

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Número de Boleta
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={boleta} 
                onChange={(e) => setBoleta(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Número de teléfono
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Correo institucional
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>
          </Stack>

          {/* Vehicles Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "18px",
                mb: 2,
              }}
            >
              Vehículos:
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {vehicleData.map((vehicle) => (
              <Box
                key={vehicle.id}
                sx={{
                  display: "flex",
                  flexDirection:"row",
                  columnGap:"1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 5,
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "46px",
                    borderRadius: "13px",
                    boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "0.1px solid rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={vehicle.foto_vehiculo}
                    alt="Car"
                    sx={{
                      width: "42px",
                      height: "34px",
                      ml: 1,
                    }}
                  />
                  <CardContent sx={{ pl: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Bold, Helvetica",
                        fontWeight: "bold",
                        fontSize: "13px",
                        lineHeight: 1,
                      }}
                    >
                      {vehicle.modelo}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {vehicle.placas}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "11px",
                      }}
                    >
                      {vehicle.color}
                    </Typography>
                  </CardContent>
                </Card>

                <IconButton
                  sx={{
                    width: "49px",
                    height: "46px",
                    bgcolor: "#770275",
                    borderRadius: "13px",
                    boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "0.1px solid rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      bgcolor: "#5c0159",
                    },
                  }}
                  onClick={() => handleDeleteVehicle(vehicle.placas)} 
                >
                  <DeleteIcon sx={{ color: "white", fontSize: 32 }} />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "160px",
                height: "38px",
                bgcolor: "#0090a4",
                borderRadius: "13px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#007a8a",
                },
              }}
              onClick={handleUpdateUser}
            >
              Guardar
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "160px",
                height: "38px",
                bgcolor: "#770275",
                borderRadius: "13px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#5c0159",
                },
              }}
              onClick={handleDeleteUser}
            >
              Eliminar
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
    <AdminNav/>
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

export default EdicionDeUsuarios;