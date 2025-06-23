import { useEffect, useState } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { supabase } from "../../supabaseClient";
import perfil from "../../assets/profile.jpg";
import defaultBackground from "../../assets/FONDO.png";

const Header = ({
  sectionTitle = "Sección",
  userName = "Usuario",
  showAvatar = true,
  backgroundColor = "rgba(0, 34, 80, 0.7)",
  backgroundImage = defaultBackground,
  showBackgroundImage = true,
}) => {
  const [avatar, setAvatar] = useState(perfil);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) return;

        const { data, error } = await supabase
          .from("usuarios")
          .select("avatar_url")
          .eq("id_usuario", user.id)
          .maybeSingle();

        if (error || !data) return;

        if (data.avatar_url) {
          const { data: urlData, error: urlError } = supabase.storage
            .from("avatars")
            .getPublicUrl(data.avatar_url);

          if (!urlError && urlData?.publicUrl) {
            setAvatar(urlData.publicUrl);
            localStorage.setItem("avatar", urlData.publicUrl); // opcional, para cache
            return;
          }
        }

        // fallback si no hay avatar en BD
        const localAvatar = localStorage.getItem("avatar");
        if (localAvatar) setAvatar(localAvatar);
      } catch (error) {
        console.error("Error cargando avatar en header:", error);
      }
    };

    fetchAvatar();
  }, []);

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }
    localStorage.clear();
    navigate("/Login");
  };

  const headerContent = (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor,
        height: "60px",
        px: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "18px",
        }}
      >
        {sectionTitle}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
          }}
        >
          {userName}
        </Typography>

        {showAvatar && (
          <Box
            sx={{
              position: "relative",
              width: "37px",
              height: "37px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .overlay": {
                backgroundColor: "rgba(0, 34, 80, 0.9)",
              },
              "&:hover .avatar-img": {
                opacity: 0,
              },
            }}
          >
            {/* Imagen del avatar */}
            <Box
              component="img"
              src={avatar}
              alt="Perfil"
              className="avatar-img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease",
              }}
            />

            {/* logout */}
            <IconButton
              component={Link}
              onClick={handleLogout}
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 33, 80, 0.49)",
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
              }}
            >
              <LogoutIcon sx={{ color: "#fff", fontSize: 20 }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  );

  return showBackgroundImage ? (
    <Box
      sx={{
        height: "25vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {headerContent}
    </Box>
  ) : (
    headerContent
  );
};

export default Header;
