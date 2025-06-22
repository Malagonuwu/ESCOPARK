import { Box, Container } from "@mui/material";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import Form from "../../components/Vehiculos/EditVBox";

const AddVehículo = () => {
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

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Form />
      </Box>

      <NavegationBar />
    </Container>
  );
};

export default AddVehículo;
