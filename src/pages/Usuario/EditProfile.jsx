import { Box, Container } from "@mui/material";

// Componentes
import Header from "../../components/General/Header";
import EditProfileBpx from "../../components/Profile/EditProfileBox";
import NavegationBar from "../../components/General/NavegationBar";

const EditProfile = () => {
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
        position: "relative",
      }}
    >
      {/* Header */}
      <Box>
        <Header sectionTitle="Perfil > Editar" userName="Ale" />
      </Box>

      {/* Caja de edición de perfil */}
      <EditProfileBpx />

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default EditProfile;
