import { useEffect, useState } from "react";
import { Box, Button, Container, Typography} from "@mui/material";

// Componentes
import Header from "../../components/General/Header";
import NavegationBarPolicia from "../../components/Policia/NavegationBarPolicia";
import RegistrarEntradaModal from "../../components/Policia/RegistrarEntradaModal";

import escomLogo from "../../assets/escom_logo.png";
import escomFoto from "../../assets/escomFoto.jpeg";

// Supabase
import { supabase } from "../../supabaseClient";

const HomePolicia = () => {
  const [userName, setUserName] = useState("Cargando...");
  const [openEntrada, setOpenEntrada] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setUserName("Invitado");
        return;
      }

      const { data, error: perfilError } = await supabase
        .from("usuarios")
        .select("nombres, apellido_paterno")
        .eq("id_usuario", user.id)
        .single();

      if (perfilError || !data) {
        setUserName("Policía");
      } else {
        setUserName(`${data.nombres} ${data.apellido_paterno}`);
      }
    };

    fetchUserName();
  }, []);

  const registrarEntrada = async (codigoIngresado) => {
    const { data, error } = await supabase
      .from("registros")
      .select("*")
      .eq("codigo_acceso", codigoIngresado)
      .eq("tipo_registro", "Entrada")
      .is("fecha_salida", null)
      .maybeSingle();

    if (error || !data) {
      alert("Código inválido o ya utilizado.");
      return;
    }

    alert("Entrada registrada con éxito.");
    setOpenEntrada(false);
  };

  return (
    <Container
      disableGutters
      sx={{
        width: "100%",
        maxWidth: "412px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5", // fondo claro para el contenido
        position: "relative",
        paddingBottom: "80px", // espacio para no tapar botones
      }}
    >
      <Header
        sectionTitle="Inicio"
        userName={userName}
        showBackgroundImage={false}
        backgroundColor="#002250"
      />
      
      <Box sx={{display:"flex", flexDirection:"column", mt:"3rem", rowGap:"1rem"}}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Orbitron, Sans-Serif",
              fontWeight: "bold",
              textAlign:"center",
              fontSize: "22px",
              mt:"1rem"
            }}>
            ¡Bienvenido Policia!
          </Typography>
          <Box 
                      sx={{ 
                        display: "flex", 
                        justifyContent: "center",
                        mt: "1rem"
                      }}
                    >
                      <img 
                        src= {escomLogo} // Reemplaza con la ruta correcta
                        alt="Logo Politécnico" 
                        style={{ 
                          width: "15rem", 
                          objectFit:"contain"
                        }}
                      />
                    </Box>
                    <Typography
                                variant="h6"
                                sx={{
                                  fontFamily: "Orbitron, Sans-Serif",
                                  fontSize: "14px",
                                  textAlign:"center",
                                  mt:"1rem"
                                }}>
                      Através de este sistema podrás gestionar las entradas y salidas de los vehículos de los ususarios.
                    </Typography>
                    <Box 
                                          sx={{ 
                                            display: "flex", 
                                            justifyContent: "center",
                                            mt: "0rem"
                                          }}
                    >
                                          <img 
                                            src= {escomFoto} // Reemplaza con la ruta correcta
                                            alt="Foto Politécnico" 
                                            style={{ 
                                              marginTop:"1rem",
                                              width: "100%", 
                                              height: "auto",
                                              objectFit:"contain"
                                            }}
                                          />
                                        </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "#002250",
            "&:hover": {
              bgcolor: "#003c80",
            },
          }}
          onClick={() => setOpenEntrada(true)}
        >
          Registrar Entrada
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: "#002250",
            borderColor: "#002250",
            "&:hover": {
              borderColor: "#003c80",
              color: "#003c80",
            },
          }}
          onClick={() => (window.location.href = "/registrar-salida")}
        >
          Registrar Salida
        </Button>
      </Box>

      <RegistrarEntradaModal
        open={openEntrada}
        onClose={() => setOpenEntrada(false)}
        onSubmit={registrarEntrada}
      />

      <NavegationBarPolicia />
    </Container>
  );
};

export default HomePolicia;
