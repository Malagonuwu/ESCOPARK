import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Card,
  Select,
  TextField,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { supabase } from "../../supabaseClient";
import ProfileImage from "../../assets/profile.jpg";

const EditProfileBox = () => {
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    avatar: ProfileImage,
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    numero_boleta: "",
    carrera: "",
    correo_institucional: "",
    password: "",
    confirmPassword: "",
  });

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

        // Obtener URL de avatar si existe en BD
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

        setUserData((prev) => ({
          ...prev,
          id: user.id,
          avatar: avatarURL,
          nombres: data.nombres,
          apellido_paterno: data.apellido_paterno,
          apellido_materno: data.apellido_materno,
          numero_boleta: data.numero_boleta || "",
          carrera: data.carrera || "",
          correo_institucional: data.correo_institucional,
        }));
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
      const fileName = `${user.id}.${fileExt}`;

      // Subir imagen al storage con upsert
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Actualizar la ruta en la tabla usuarios
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ avatar_url: fileName })
        .eq("id_usuario", user.id);

      if (updateError) throw updateError;

      // Obtener URL pública para mostrar
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
      alert("Error al subir imagen: " + error.message);
    }
  };

  const handleSave = async () => {
    if (userData.password !== userData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({
          nombres: userData.nombres,
          apellido_paterno: userData.apellido_paterno,
          apellido_materno: userData.apellido_materno,
          numero_boleta: userData.numero_boleta,
          carrera: userData.carrera,
          correo_institucional: userData.correo_institucional,
        })
        .eq("id_usuario", userData.id);

      if (updateError) {
        alert("Error actualizando datos: " + updateError.message);
        return;
      }

      if (userData.password) {
        const { error: passError } = await supabase.auth.updateUser({
          password: userData.password,
        });

        if (passError) {
          alert("Error actualizando contraseña: " + passError.message);
          return;
        }
      }

      alert("Perfil actualizado con éxito.");
    } catch (error) {
      alert("Error al guardar perfil: " + error.message);
    }
  };

  return (
    <Box sx={{ width: "80%", position: "relative", top: "-42px", left: "10%" }}>
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
          pt: 6,
        }}
      >
        {/* Avatar */}
        <Box sx={{ position: "absolute", top: -50 }}>
          <Avatar src={userData.avatar} sx={{ width: 100, height: 100 }} />
          <IconButton
            sx={{
              position: "absolute",
              bottom: -8,
              right: -1,
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

        {/* Nombre(s) */}
        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography>Nombre(s)</Typography>
          <TextField
            value={userData.nombres}
            onChange={(e) => setUserData((p) => ({ ...p, nombres: e.target.value }))}
            variant="outlined"
            size="small"
            sx={{ width: 260 }}
          />
        </Box>

        {/* Apellidos */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box>
            <Typography>Apellido paterno</Typography>
            <TextField
              value={userData.apellido_paterno}
              onChange={(e) => setUserData((p) => ({ ...p, apellido_paterno: e.target.value }))}
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
          <Box>
            <Typography>Apellido materno</Typography>
            <TextField
              value={userData.apellido_materno}
              onChange={(e) => setUserData((p) => ({ ...p, apellido_materno: e.target.value }))}
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>

        {/* Carrera y Boleta */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box>
            <Typography>Carrera</Typography>
            <FormControl size="small" sx={{ width: 120 }}>
              <Select
                value={userData.carrera}
                onChange={(e) => setUserData((p) => ({ ...p, carrera: e.target.value }))}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value="Ingeniería en Sistemas computacionales">
                  Ingeniería en Sistemas Computacionales
                </MenuItem>
                <MenuItem value="Ingeniería en Inteligencia Artificial">
                  Ingeniería en Inteligencia Artificial
                </MenuItem>
                <MenuItem value="Licenciatura en Ciencia de Datos">
                  Licenciatura en Ciencia de Datos
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography>No. de boleta</Typography>
            <TextField
              value={userData.numero_boleta}
              onChange={(e) => setUserData((p) => ({ ...p, numero_boleta: e.target.value }))}
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>

        {/* Correo */}
        <Box sx={{ mb: 2 }}>
          <Typography>Correo institucional</Typography>
          <TextField
            value={userData.correo_institucional}
            onChange={(e) => setUserData((p) => ({ ...p, correo_institucional: e.target.value }))}
            type="email"
            variant="outlined"
            size="small"
            sx={{ width: 260 }}
          />
        </Box>

        {/* Contraseñas */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <Typography>Contraseña nueva</Typography>
            <TextField
              value={userData.password}
              onChange={(e) => setUserData((p) => ({ ...p, password: e.target.value }))}
              type="password"
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
          <Box>
            <Typography>Confirmar contraseña</Typography>
            <TextField
              value={userData.confirmPassword}
              onChange={(e) => setUserData((p) => ({ ...p, confirmPassword: e.target.value }))}
              type="password"
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>

        {/* Botones */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#444",
              borderRadius: "8px",
              fontWeight: "bold",
              width: 100,
              height: 31,
              textTransform: "none",
            }}
            onClick={() => window.location.reload()}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#002250",
              borderRadius: "8px",
              fontWeight: "bold",
              width: 100,
              height: 31,
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default EditProfileBox;
