import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

// Icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import ProfileImage from "../../assets/profile.jpg";

// Components
import ProfileInfoItem from "./Datos";
import CustomeButton from "../General/CustomButton";

const initialUserData = {
  name: "Ale Villegas",
  role: "Estudiante",
  department: "Sistemas computacionales",
  studentId: "2022630679",
  email: "avillegasg2101@alumno.ipn.mx",
  password: "*****************",
  avatar: localStorage.getItem("avatar") || ProfileImage,
};

const ProfileBox = () => {
  const [userData, setUserData] = useState(initialUserData);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ width: "80%", position: "relative", top: "-40px", left: "10%" }}>
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
          border: "0.5px solid",
          borderColor: "grey.300",
          boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.65)",
          overflow: "visible",
        }}
      >
        {/* Avatar + Botón de cámara */}
        <Box sx={{ position: "relative", mb: 1 }}>
          {/* Avatar */}
          <Avatar
            src={userData.avatar}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: -50,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          {/* Botón de cámara */}
          <IconButton
            sx={{
              position: "absolute",
              top: 20,
              right: -51,
              backgroundColor: "#002250",
              width: 38,
              height: 38,
              border: "2.5px solid white",
              "&:hover": {
                backgroundColor: "#0090A4",
              },
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <CameraAltIcon sx={{ color: "white", fontSize: 20 }} />
          </IconButton>

          {/* Input de archivo oculto */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </Box>

        {/* Nombre y rol */}
        <Typography
          variant="h3"
          color="#002250"
          sx={{
            mt: 7,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {userData.name}
        </Typography>

        <Typography
          variant="body1"
          color="grey.700"
          sx={{ textAlign: "center", mb: 1 }}
        >
          {userData.role}
        </Typography>

        <Divider sx={{ width: "50%", my: 0.5 }} />

        {/* Información del perfil */}
        <Box sx={{ width: "100%", mt: 2, ml: 8.5 }}>
          <ProfileInfoItem
            icon={<BookmarkIcon sx={{ color: "#0090a4", mr: 1 }} />}
            value={userData.department}
          />
          <ProfileInfoItem
            icon={<StarIcon sx={{ color: "#0090A4", mr: 1 }} />}
            label="Número de boleta"
            value={userData.studentId}
          />
          <ProfileInfoItem
            icon={<EmailIcon sx={{ color: "#0090A4", mr: 1 }} />}
            value={userData.email}
          />
          <ProfileInfoItem
            icon={<VpnKeyIcon sx={{ color: "#0090A4", mr: 1 }} />}
            label="Contraseña"
            value={userData.password}
          />
        </Box>

        {/* Botón de editar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            my: 2,
            mr: 8,
          }}
        >
          <CustomeButton
            to={"/EditProfile"}
            name={"Editar"}
            sx={{
              ":hover": {
                bgcolor: "#0090A4",
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileBox;
