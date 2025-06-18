import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

// In a real implementation, these would be imported from your assets
// Using placeholder URLs for demonstration
const headerImage = "header.svg";
const avatarImage = "image-3.png";
const carImage = "MIAUTOGDL-79-876x535-2.png";

const EdicionDeUsuarios = () => {
  // User data
  const userData = {
    name: "Luis David Martínez Martínez",
    boleta: "2022630175",
    phone: "9711275226",
    email: "9711275226",
  };

  // Vehicle data
  const vehicleData = [
    {
      id: "TKM2ICKKCK",
      model: "Chevrolet Aveo 2015",
      color: "PLATEADO",
      image: carImage,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "440px",
          height: "956px",
          position: "relative",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "440px",
            height: "179px",
            position: "relative",
            backgroundImage: "url(/aver-1.png)",
            backgroundSize: "100% 100%",
          }}
        >
          <Box
            component="img"
            src={headerImage}
            alt="Header"
            sx={{
              width: "440px",
              height: "72px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
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
              right: "70px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={avatarImage}
              alt="User Avatar"
              sx={{ width: 45, height: 45 }}
            />
            <Typography
              sx={{
                ml: 1,
                color: "white",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "15px",
              }}
            >
              ad
            </Typography>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Box>
        </Box>

        {/* Main Content */}
        <Container sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Orbitron-Bold, Helvetica",
              fontWeight: "bold",
              fontSize: "18px",
              mb: 2,
            }}
          >
            Editar usuario: Luis David Martínez
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Form Fields */}
          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Nombre de usuario
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.name}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Número de Boleta
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.boleta}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Número de teléfono
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.phone}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Orbitron-Bold, Helvetica",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Correo institucional
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.email}
                InputProps={{
                  sx: { borderRadius: "8px" },
                }}
              />
            </Box>
          </Stack>

          {/* Vehicles Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                fontSize: "18px",
                mb: 2,
              }}
            >
              Vehículos de: Luis David Martínez
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {vehicleData.map((vehicle) => (
              <Box
                key={vehicle.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Card
                  sx={{
                    width: "301px",
                    height: "46px",
                    borderRadius: "13px",
                    boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "0.1px solid rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={vehicle.image}
                    alt="Car"
                    sx={{
                      width: "42px",
                      height: "34px",
                      ml: 1,
                    }}
                  />
                  <CardContent sx={{ pl: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Bold, Helvetica",
                        fontWeight: "bold",
                        fontSize: "13px",
                        lineHeight: 1,
                      }}
                    >
                      {vehicle.model}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {vehicle.id}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "11px",
                      }}
                    >
                      {vehicle.color}
                    </Typography>
                  </CardContent>
                </Card>

                <IconButton
                  sx={{
                    width: "49px",
                    height: "46px",
                    bgcolor: "#770275",
                    borderRadius: "13px",
                    boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "0.1px solid rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      bgcolor: "#5c0159",
                    },
                  }}
                >
                  <DeleteIcon sx={{ color: "white", fontSize: 32 }} />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 8,
              mb: 4,
              px: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "160px",
                height: "38px",
                bgcolor: "#0090a4",
                borderRadius: "13px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#007a8a",
                },
              }}
            >
              Guardar
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "160px",
                height: "38px",
                bgcolor: "#770275",
                borderRadius: "13px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#5c0159",
                },
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default EdicionDeUsuarios;