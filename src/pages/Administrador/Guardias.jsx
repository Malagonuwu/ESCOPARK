import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const formFields = [
  {
    id: "name",
    label: "Nombre (s)",
    placeholder: "Ingresa el nombre del policia",
  },
  {
    id: "paternalLastName",
    label: "Apellido Paterno",
    placeholder: "Ingresa el apellido paterno",
  },
  {
    id: "maternalLastName",
    label: "Apellido Materno",
    placeholder: "Ingresa el apellido materno",
  },
  {
    id: "phoneNumber",
    label: "Numero telefónico",
    placeholder: "Ingresa el número telefónico",
  },
  {
    id: "idNumber",
    label: "Numero id O cédula",
    placeholder: "Ingresa la cédula de identificación",
  },
];

const RegistroDePolicias = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "white" }}>
      <Container
        maxWidth={false}
        sx={{
          width: "440px",
          height: "956px",
          position: "relative",
          overflow: "hidden",
          bgcolor: "white",
          p: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            height: "179px",
            position: "relative",
            background: "linear-gradient(to right, #770275, #3b0137)",
            backgroundSize: "100% 100%",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "72px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            alt="Header"
            src="header.svg"
          />

          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "27px",
              left: "20px",
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            Administrador
          </Typography>

          <Box
            sx={{
              position: "absolute",
              top: "13px",
              right: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src="image-3.png"
              alt="User Avatar"
              sx={{ width: 45, height: 45 }}
            />
            <Typography
              sx={{
                fontFamily: "Inter-Regular, Helvetica",
                color: "white",
                fontSize: "15px",
                ml: 1,
              }}
            >
              ad
            </Typography>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Box>
        </Box>

        {/* Form Title */}
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            ml: 2.5,
            fontFamily: "Orbitron-Bold, Helvetica",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Registrar Nuevo Policia
        </Typography>

        <Divider sx={{ mt: 1, mx: 2 }} />

        {/* Form Fields */}
        <Stack spacing={2} sx={{ mt: 3, mx: 5 }}>
          {formFields.map((field) => (
            <Box key={field.id}>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                {field.label}
              </Typography>
              <TextField
                fullWidth
                placeholder={field.placeholder}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          ))}
        </Stack>

        {/* Register Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              width: "160px",
              height: "38px",
              bgcolor: "#770275",
              borderRadius: "13px",
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "16px",
              boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Registrar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegistroDePolicias;
