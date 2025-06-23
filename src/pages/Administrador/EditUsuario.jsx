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

import React,{ useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Header from "../../components/General/Header";
import BarNav from "../../components/General/NavegationBar";
import {ComponenteVehiculo} from "../../components/Vehiculos/infoVehiculo";


const EdicionDeUsuarios = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [boleta, setBoleta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_usuario", id)
        .single();

      if (error) {
        console.error("Error al obtener usuario:", error.message);
      } else {
        setUserData(data);
        setNombre(data.nombres || "");
        setBoleta(data.id_usuario || "");
        setTelefono(data.telefono || "");
        setCorreo(data.correo_institucional || "");
      }
    };

    const fetchVehiculos = async () => {
      const { data, error } = await supabase
        .from("vehiculos")
        .select("*")
        .eq("id_usuario", id); 

      if (error) {
        console.error("Error al obtener vehículos:", error.message);
      } else {
        setVehicleData(data);
      }
    };

    fetchUsuario();
    fetchVehiculos();
  }, [id]);
   const handleEliminarUsuario = async () => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario "${userData.nombres}"?`
    );

    if (!confirmacion) return;

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_usuario", id);

    if (error) {
      alert("Hubo un error al eliminar el usuario: " + error.message);
    } else {
      alert("Usuario eliminado correctamente.");
      navigate("/Usuarios"); 
    }
  };
  const handleGuardarUsuario = async () => {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombres: nombre,
        id_usuario: boleta,
        correo_institucional: correo,
      })
      .eq("id_usuario", id); 

    if (error) {
      alert("Error al guardar los cambios: " + error.message);
    } else {
      alert("Usuario actualizado correctamente.");
      navigate("/Usuarios");
    }
  };
  return (
    <Box sx={{widt:"100%", height:"100vh", overflowX: "hidden"}}>
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
                height: "70vh",
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
                  Editar usuario: Luis David Martínez
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
                      
                      InputProps={{
                        sx: { borderRadius: "8px" },
                      }}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
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
                    Vehículos de: Luis David Martínez
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {vehicleData.map((vehicle) => (
                    <Box
                      key={vehicle.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Card
                        sx={{
                          width: "301px",
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
                          src={vehicle.image}
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
                            {vehicle.model}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Orbitron-Regular, Helvetica",
                              fontSize: "8px",
                              lineHeight: 1.2,
                            }}
                          >
                            {vehicle.id}
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
                      >
                        <DeleteIcon sx={{ color: "white", fontSize: 32 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                <Box sx={{
                    padding:"1rem",
                    width:"100%"
                  }}>
                    <ComponenteVehiculo/>
                </Box>
                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 8,
                    mb: 4,
                    px: 2,
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
                    onClick={handleGuardarUsuario}
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
                        bgcolor: "#007a8a",
                      },
                    }}
                    onClick={handleEliminarUsuario}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Container>
            </Paper>
      </Box>
      
      <BarNav/>
    </Box>

    
  );
};

export default EdicionDeUsuarios;