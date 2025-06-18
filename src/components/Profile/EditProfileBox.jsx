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

import ProfileImage from "../../assets/profile.jpg";

const EditProfileBox = () => {
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    avatar: localStorage.getItem("avatar") || ProfileImage,
  });

  const formData = {
    personalInfo: [
      { id: "name", label: "Nombre(s)", value: "Alejandra" },
      {
        id: "lastName",
        label: "Apellido paterno",
        value: "Villegas",
        halfWidth: true,
      },
      {
        id: "motherLastName",
        label: "Apellido materno",
        value: "Gómez",
        halfWidth: true,
      },
    ],
    academicInfo: [
      {
        id: "career",
        label: "Carrera en curso",
        value: "Sistemas computacio...",
        isSelect: true,
        halfWidth: true,
      },
      {
        id: "studentId",
        label: "No. de boleta",
        value: "2022630679",
        halfWidth: true,
      },
    ],
    accountInfo: [
      {
        id: "email",
        label: "Correo institucional",
        value: "avillegasg2101@alumno.ipn.mx",
        type: "email",
        fullWidth: true,
      },
      {
        id: "password",
        label: "Contraseña",
        value: "**************",
        type: "password",
        halfWidth: true,
      },
      {
        id: "confirmPassword",
        label: "Confirmar contr...",
        value: "****************",
        type: "password",
        halfWidth: true,
      },
    ],
  };

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
        {/* Avatar + Botón de cámara */}
        <Box sx={{ position: "absolute", top: -50 }}>
          <Avatar
            src={userData.avatar}
            sx={{
              width: 100,
              height: 100,
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: -8,
              right: -1,
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </Box>

        {/* Personal Info */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 12,
                color: "#1e1e1e",
              }}
            >
              {formData.personalInfo[0].label}
            </Typography>
            <TextField
              placeholder={formData.personalInfo[0].value}
              variant="outlined"
              size="small"
              sx={{ width: 260 }}
              InputProps={{
                sx: {
                  fontFamily: "Inter-Regular, Helvetica",
                  fontSize: 12,
                  color: "#00000066",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {formData.personalInfo.slice(1).map((field) => (
              <Box key={field.id}>
                <Typography
                  sx={{
                    fontFamily: "'Audiowide', sans-serif",
                    fontSize: 12,
                    color: "#1e1e1e",
                  }}
                >
                  {field.label}
                </Typography>
                <TextField
                  placeholder={field.value}
                  variant="outlined"
                  size="small"
                  sx={{ width: 120 }}
                  InputProps={{
                    sx: {
                      fontFamily: "Inter-Regular, Helvetica",
                      fontSize: 12,
                      color: "#00000066",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Academic Info */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 12,
                color: "#1e1e1e",
              }}
            >
              {formData.academicInfo[0].label}
            </Typography>
            <FormControl size="small" sx={{ width: 120 }}>
              <Select
                displayEmpty
                value=""
                IconComponent={KeyboardArrowDownIcon}
                renderValue={() => formData.academicInfo[0].value}
                sx={{
                  fontFamily: "Inter-Regular, Helvetica",
                  fontSize: 12,
                  color: "#00000066",
                }}
              >
                <MenuItem value="">
                  <em>Sistemas computacionales</em>
                </MenuItem>
                <MenuItem value="Inteligencia Artificial">
                  Ingeniería en Inteligencia Artificial
                </MenuItem>
                <MenuItem value="Ciencia de Datos">
                  Licenciatura en Ciencia de Datos
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 12,
                color: "#1e1e1e",
              }}
            >
              {formData.academicInfo[1].label}
            </Typography>
            <TextField
              placeholder={formData.academicInfo[1].value}
              variant="outlined"
              size="small"
              sx={{ width: 120 }}
              InputProps={{
                sx: {
                  fontFamily: "Inter-Regular, Helvetica",
                  fontSize: 12,
                  color: "#00000066",
                },
              }}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontFamily: "'Audiowide', sans-serif",
              fontSize: 12,
              color: "#1e1e1e",
            }}
          >
            {formData.accountInfo[0].label}
          </Typography>
          <TextField
            placeholder={formData.accountInfo[0].value}
            type={formData.accountInfo[0].type}
            variant="outlined"
            size="small"
            sx={{ width: 260 }}
            InputProps={{
              sx: {
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: 12,
                color: "#00000066",
              },
            }}
          />
        </Box>

        {/* Passwords */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {formData.accountInfo.slice(1).map((field) => (
            <Box key={field.id}>
              <Typography
                sx={{
                  fontFamily: "'Audiowide', sans-serif",
                  fontSize: 12,
                  color: "#1e1e1e",
                }}
              >
                {field.label}
              </Typography>
              <TextField
                placeholder={field.value}
                type={field.type}
                variant="outlined"
                size="small"
                sx={{ width: 120 }}
                InputProps={{
                  sx: {
                    fontFamily: "Inter-Regular, Helvetica",
                    fontSize: 12,
                    color: "#00000066",
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#444444",
              borderRadius: "8px",
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "16px",
              width: 100,
              height: 31,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#002250",
              borderRadius: "8px",
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "16px",
              width: 100,
              height: 31,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#001a3c",
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default EditProfileBox;
