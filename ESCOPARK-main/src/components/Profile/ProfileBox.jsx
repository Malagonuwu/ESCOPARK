import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  CameraAlt as CameraAltIcon,
  Bookmark as BookmarkIcon,
  Star as StarIcon,
  Email as EmailIcon,
  VpnKey as VpnKeyIcon,
} from "@mui/icons-material";

import ProfileInfoItem from "./Datos";
import ProfileImage from "../../assets/profile.jpg";
import { supabase } from "../../supabaseClient";

const ProfileBox = () => {
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error al obtener usuario:", authError);
          return;
        }

        const { data, error } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id_usuario", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error al obtener datos del perfil:", error);
          return;
        }

        if (!data) {
          console.warn("No se encontró perfil para este usuario");
          return;
        }

        // URL imagen avatar por defecto
        let avatarURL = ProfileImage;

        if (data.avatar_url) {
          const { data: urlData, error: urlError } = supabase.storage
            .from("avatars")
            .getPublicUrl(data.avatar_url);

          if (!urlError && urlData?.publicUrl) {
            avatarURL = urlData.publicUrl;
          }
        } else if (localStorage.getItem("avatar")) {
          avatarURL = localStorage.getItem("avatar");
        }

        setUserData({
          name: `${data.nombres} ${data.apellido_paterno} ${data.apellido_materno}`,
          role: data.tipo_usuario,
          department: data.carrera,
          studentId: data.numero_boleta,
          email: data.correo_institucional,
          password: "*****************",
          avatar: avatarURL,
        });
      } catch (error) {
        console.error("Error inesperado al obtener datos:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuario no autenticado");

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`; // nombre único para cada usuario

      // Subir archivo con upsert para reemplazar si ya existe
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Actualizar ruta del avatar en tabla usuarios
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ avatar_url: fileName })
        .eq("id_usuario", user.id);

      if (updateError) throw updateError;

      // Obtener URL pública para mostrar la imagen
      const { data: urlData, error: urlError } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      setUserData((prev) => ({
        ...prev,
        avatar: urlData.publicUrl,
      }));

      localStorage.setItem("avatar", urlData.publicUrl);
    } catch (error) {
      console.error("Error al subir imagen:", error.message);
    }
  };

  if (!userData) return <Typography>Cargando...</Typography>;

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
        <Box sx={{ position: "relative", mb: 1 }}>
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
          <IconButton
            sx={{
              position: "absolute",
              top: 20,
              right: -51,
              backgroundColor: "#002250",
              width: 38,
              height: 38,
              border: "2.5px solid white",
              "&:hover": { backgroundColor: "#0090A4" },
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <CameraAltIcon sx={{ color: "white", fontSize: 20 }} />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </Box>

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
        <Typography variant="body1" color="grey.700" sx={{ textAlign: "center", mb: 1 }}>
          {userData.role}
        </Typography>
        <Divider sx={{ width: "50%", my: 0.5 }} />
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 2, mb: 4 }}>
          <Link to="/EditProfile">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#002250",
                fontWeight: 600,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 15,
                height: 40,
                mr: 5,
                "&:hover": { bgcolor: "#0090a4" },
              }}
            >
              Editar
            </Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileBox;
