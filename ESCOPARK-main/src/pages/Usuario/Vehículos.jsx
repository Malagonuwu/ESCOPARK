import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DirectionsCar, TwoWheeler } from "@mui/icons-material";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import CustomButton from "../../components/General/CustomButton";
import ModalVehiculo from "../../pages/Vehiculo/ModalVehiculo";

// Supabase
import { supabase } from "../../supabaseClient";

const Vehiculos = () => {
  const navigate = useNavigate();
  const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
  const id_usuario = perfil.id_usuario;

  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  useEffect(() => {
    if (!id_usuario) {
      alert("No se encontró el usuario logueado.");
      navigate("/login");
      return;
    }

    const fetchVehiculos = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("vehiculos")
          .select("*")
          .eq("id_usuario", id_usuario)
          .order("id_vehiculo", { ascending: false });

        if (error) throw error;
        setVehiculos(data || []);
      } catch (error) {
        console.error("Error al obtener vehículos:", error.message);
        alert("Error al obtener vehículos: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, [id_usuario, navigate]);

  const handleOpenModal = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setVehiculoSeleccionado(null);
  };

  const getVehicleIcon = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case "moto":
        return <TwoWheeler sx={{ fontSize: 40 }} />;
      default:
        return <DirectionsCar sx={{ fontSize: 40 }} />;
    }
  };

  return (
    <Container
      disableGutters
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent:"space-between",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Header
        sectionTitle="Vehículos"
        userName={`${perfil.nombres || "Usuario"} ${perfil.apellido_paterno || ""}`}
        showBackgroundImage={false}
        backgroundColor="#002250"
      />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            width: "85%",
            fontFamily: "Inter, Helvetica",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Vehículos registrados, seleccione alguno para ver su información
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : vehiculos.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <DirectionsCar sx={{ fontSize: 60, color: "text.disabled" }} />
            <Typography variant="h6" color="text.secondary">
              No tienes vehículos registrados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Agrega tu primer vehículo para comenzar
            </Typography>
          </Box>
        ) : (
          vehiculos.map((vehiculo) => (
            <Box
              key={vehiculo.id_vehiculo}
              sx={{
                width: "85%",
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={() => handleOpenModal(vehiculo)}
            >
              <Avatar
                variant="rounded"
                src={vehiculo.foto_vehiculo}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "grey.100",
                }}
              >
                {!vehiculo.foto_vehiculo && getVehicleIcon(vehiculo.tipo_vehiculo)}
              </Avatar>
              <Box>
                <Typography fontWeight="bold">
                  {vehiculo.marca} {vehiculo.modelo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {vehiculo.placas}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ py:20, display: "flex", justifyContent: "center" }}>
        <CustomButton
          to="/vehiculos/agregar"
          name="Agregar vehículo"
          width="70%"
          alignItems="center"
        />
      </Box>

      <NavegationBar />

      <ModalVehiculo
        open={openModal}
        onClose={handleCloseModal}
        vehiculo={vehiculoSeleccionado}
      />
    </Container>
  );
};

export default Vehiculos;
