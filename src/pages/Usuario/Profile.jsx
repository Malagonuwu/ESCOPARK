import { Box, Container } from "@mui/material";
import { useState } from "react";

// Componentes
import Header from "../../components/General/Header";
import ProfileBox from "../../components/Profile/ProfileBox";
import NavegationBar from "../../components/General/NavegationBar";
import CustomButton from "../../components/General/CustomButton";
import WarningModal from "../../components/General/WarningModal";

const Profile = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const handleDeleteAccount = () => {
    // Lógica para eliminar cuenta
    setShowModal(false);
  };

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
      {/* Header y perfil */}
      <Box>
        <Header sectionTitle="Perfil" userName="Ale" />
        <ProfileBox />
      </Box>

      {/* Botón para eliminar cuenta */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <CustomButton
          name="Eliminar cuenta"
          onClick={() => setShowModal(true)}
          sx={{
            top: -20,
            bgcolor: "#d32f2f",
            "&:hover": {
              bgcolor: "#b71c1c",
            },
          }}
        />
      </Box>

      {/* Modal de confirmación */}
      {showModal && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningModal
            title="¿Estás seguro de eliminar tu cuenta?"
            description="Me entristece saber que te vas :("
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowModal(false)}
            confirmText="Eliminar"
          />
        </Box>
      )}

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default Profile;
