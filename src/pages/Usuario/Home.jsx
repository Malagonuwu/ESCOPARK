import { Box, Container } from "@mui/material";
import { useState } from "react";

//Imagenes
import fondo from "../../assets/Cel.jpg";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";

const Home = () => {
  return (
    <Container
      disableGutters
      sx={{
        width: "412px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header y perfil */}
      <Box>
        <Header
          sectionTitle="Inicio"
          userName="Ale"
          showBackgroundImage={false}
          backgroundColor="#002250"
        />
      </Box>

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default Home;
