import { Paper, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

// Imágenes
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
  const avatar = localStorage.getItem("avatar");

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
              src={avatar || perfil}
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
              to="/Login"
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
