import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Header from "../../components/General/Header";
import ProfileBox from "../../components/Profile/ProfileBox";
import NavegationBar from "../../components/General/NavegationBar";
import CustomButton from "../../components/General/CustomButton";
import WarningModal from "../../components/General/WarningModal";

// Para traer userData igual que antes (ejemplo)
import { supabase } from "../../supabaseClient";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo_institucional", user.email)
        .single();

      if (error) {
        setLoading(false);
        return;
      }

      setUserData(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    if (!userData) return;

    try {
      console.log("Eliminando usuario con id_usuario:", userData.id_usuario);

      const res = await fetch(
        `http://localhost:4000/api/delete-user/${userData.id_usuario}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Error al eliminar la cuenta: " + data.error);
        return;
      }

      alert("Cuenta eliminada correctamente");

      // Limpia localStorage o estados relacionados con el usuario
      localStorage.clear();

      // Opcional: cerrar sesión en Supabase (por si quedó algo)
      await supabase.auth.signOut();

      // Redirige al login o página pública
      navigate("/login");
    } catch (error) {
      alert("Error al conectar con el servidor backend");
    } finally {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          width: "412px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Cargando perfil...</p>
      </Container>
    );
  }

  return (
    <Container
      disableGutters
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {/* Header y perfil */}
      <Box>
        <Header
          sectionTitle="Perfil"
          userName={
            userData
              ? `${userData.nombres} ${userData.apellido_paterno}`
              : "Usuario"
          }
        />
        <ProfileBox userData={userData} />
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
            top: -90,
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
