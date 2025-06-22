import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

//imgs
import Avatar from "../../assets/logo.jpg";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import Vehiculo from "../../components/Vehiculos/Vehiculo";
import CustomButton from "../../components/General/CustomButton";
import ModalVehiculo from "../../components/Vehiculos/ModalVehiculo";

const Vehículos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const handleOpenModal = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setVehiculoSeleccionado(null);
  };

  const vehiculos = [
    {
      avatar: Avatar,
      nombre: "Motocicleta",
      tipo: "Motocicleta",
      marca: "Italika",
      modelo: "FT125",
      placas: "NDF32WK",
      descripcion: "Moto de uso diario.",
    },
    {
      avatar: Avatar,
      nombre: "Auto BYD",
      tipo: "Automóvil",
      marca: "BYD",
      modelo: "Dolphin",
      placas: "XYZ123",
      descripcion:
        "Auto eléctrico compacto, color dorado, con asientos de cuero y sistema de navegación avanzado.",
    },
  ];

  return (
    <Container
      disableGutters
      sx={{
        width: "412px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Header
        sectionTitle="Vehículos"
        userName="Ale"
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

        {vehiculos.map((v, i) => (
          <Vehiculo
            key={i}
            avatar={v.avatar}
            label={v.nombre}
            placa={v.placas}
            onClick={() => handleOpenModal(v)}
          />
        ))}
      </Box>

      <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
        <CustomButton
          to="/AddVehiculo"
          name="Agregar vehículo"
          width="70%"
          alignItems="center"
        />
      </Box>

      <NavegationBar />

      {/* Modal */}
      <ModalVehiculo
        open={openModal}
        onClose={handleCloseModal}
        vehiculo={vehiculoSeleccionado}
      />
    </Container>
  );
};

export default Vehículos;
