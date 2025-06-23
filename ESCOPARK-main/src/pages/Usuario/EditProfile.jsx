import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { supabase } from "../../supabaseClient";

// Componentes
import Header from "../../components/General/Header";
import EditProfileBox from "../../components/Profile/EditProfileBox";
import NavegationBar from "../../components/General/NavegationBar";

const EditProfile = () => {
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("usuarios")
        .select("nombres")
        .eq("id_usuario", user.id)
        .single();

      if (data && !error) {
        setUserName(data.nombres);
      }
    };

    fetchUserName();
  }, []);

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
        <Header sectionTitle="Perfil > Editar" userName={userName} />
      </Box>

      {/* Caja de edición de perfil */}
      <EditProfileBox />

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default EditProfile;
