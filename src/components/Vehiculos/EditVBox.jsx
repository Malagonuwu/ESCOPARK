import { useState, useRef } from "react";
import {
  Box,
  Card,
  Avatar,
  IconButton,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

//Componentes
import CustomeButton from "../General/CustomButton";

const EditVBox = () => {
  const fileInputRef = useRef(null);

  const [vehicleData, setVehicleData] = useState({
    photo: null,
    plate: "",
    brand: "",
    model: "",
    color: "",
    type: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setVehicleData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (field) => (e) => {
    setVehicleData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Box sx={{ width: "80%", position: "relative", top: "70px", left: "10%" }}>
      <Card
        sx={{
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
        {/* Foto vehículo + botón para cambiar */}
        <Box sx={{ position: "absolute", top: -50 }}>
          <Avatar
            src={vehicleData.photo}
            sx={{
              width: 100,
              height: 100,
            }}
            variant="rounded"
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

        {/* Campos del formulario */}
        <Box
          sx={{
            width: "100%",
            px: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 12,
                color: "#1e1e1e",
              }}
            >
              Placas
            </Typography>
            <TextField
              placeholder="Ejemplo: XYZ-1234"
              variant="outlined"
              size="small"
              value={vehicleData.plate}
              onChange={handleChange("plate")}
              sx={{ width: 250 }}
              InputProps={{
                sx: {
                  fontFamily: "Inter-Regular, Helvetica",
                  fontSize: 12,
                  color: "#00000066",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 2,
              alignItems: "center",
            }}
          >
            {[
              {
                label: "Marca",
                value: vehicleData.brand,
                field: "brand",
                placeholder: "Marca",
              },
              {
                label: "Modelo",
                value: vehicleData.model,
                field: "model",
                placeholder: "Modelo",
              },
              {
                label: "Color",
                value: vehicleData.color,
                field: "color",
                placeholder: "Color",
              },
            ].map((item) => (
              <Box key={item.field}>
                <Typography
                  sx={{
                    fontFamily: "'Audiowide', sans-serif",
                    fontSize: 12,
                    color: "#1e1e1e",
                  }}
                >
                  {item.label}
                </Typography>
                <TextField
                  placeholder={item.placeholder}
                  variant="outlined"
                  size="small"
                  value={item.value}
                  onChange={handleChange(item.field)}
                  sx={{ width: 250 }}
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

            {/* Select de tipo */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Audiowide', sans-serif",
                  fontSize: 12,
                  color: "#1e1e1e",
                }}
              >
                Tipo de vehículo
              </Typography>
              <FormControl size="small" sx={{ width: 250 }}>
                <Select
                  value={vehicleData.type}
                  onChange={handleChange("type")}
                  displayEmpty
                  sx={{
                    fontFamily: "Inter-Regular, Helvetica",
                    fontSize: 12,
                    color: vehicleData.type ? "#000" : "#00000066",
                  }}
                >
                  <MenuItem value="">
                    <em>Selecciona tipo</em>
                  </MenuItem>
                  <MenuItem value="Automóvil">Automóvil</MenuItem>
                  <MenuItem value="Motocicleta">Motocicleta</MenuItem>
                  <MenuItem value="Bicicleta">Bicicleta</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 3 }}>
          <CustomeButton
            to={"/Profile"}
            name={"Cancelar"}
            sx={{
              fontFamily: "'Inter', sans-serif",
              textTransform: "none",
              "&:hover": { bgcolor: "grey" },
            }}
          />
          <CustomeButton
            to={"/Profile"}
            name={"Aceptar"}
            sx={{
              fontFamily: "'Inter', sans-serif",
              textTransform: "none",
              backgroundColor: "#002250",
              "&:hover": { bgcolor: "#0090a4" },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default EditVBox;
