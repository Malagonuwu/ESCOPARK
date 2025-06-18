import { Box, Container } from "@mui/material";
import { useState } from "react";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";

const Vehículos = () => {
  return (
    <Container
      disableGutters
      sx={{
        width: "412px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {/* Header y perfil */}
      <Box>
        <Header sectionTitle="Vehículos" userName="Ale" />
      </Box>

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default Vehículos;
