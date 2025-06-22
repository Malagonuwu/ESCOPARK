import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

//imgs
import Avatar from "../../assets/logo.jpg";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import Vehiculo from "../../components/Vehiculos/Vehiculo";

const Acceso = () => {
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
        sectionTitle="Acceso"
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
            fontFamily: "Inter, Helvetica",
            textAlign: "center",
            fontSize: "14px",
            width: "85%",
          }}
        >
          Seleccione el vehículo que desea ingresar al estacionamiento
        </Typography>

        {vehiculos.map((v, i) => (
          <Vehiculo
            key={i}
            avatar={v.avatar}
            label={v.nombre}
            placa={v.placas}
          />
        ))}
      </Box>

      <NavegationBar />
    </Container>
  );
};

export default Acceso;
