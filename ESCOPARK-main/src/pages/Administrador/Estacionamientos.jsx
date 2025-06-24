import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

// Imagenes
import fondo from "../../assets/back.png";

//Components
import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";
import React, { useState,useEffect } from "react";
// Mock data for parking spaces
const parkingSpaces = [
  {
    id: 1,
    name: "Motocicletas",
    available: 10,
  },
  {
    id: 2,
    name: "Vehículos A",
    available: 10,
  },
];

const Estacionamientos = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [estacionamientos, setEstaciona] = useState([]);
  const handleMenuClick = (event, idEstacionamiento) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(idEstacionamiento);
    handleEdit(idEstacionamiento);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleEdit = (idEstacionamiento) => {
    navigate(`/EditEstacionamiento/${idEstacionamiento}`);
    handleClose();
  };
    

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/get-estacionamiento");
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await response.json();
        setEstaciona(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const navigate = useNavigate();
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
      {/* Header */}
      <Header
        sectionTitle="Estacionamientos"
        userName="Administrador"
        showAvatar={false}
        backgroundColor="rgba(119, 2, 117, 0.77)"
        backgroundImage={fondo}
      />

      {/* Main Content */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron-Bold, Helvetica",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Gestión de estacionamientos
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Parking Spaces List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {estacionamientos.map((space) => (
            <Card
              key={space.idEstacionamiento}
              sx={{
                borderRadius: "13px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
              }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Orbitron-Bold, Helvetica",
                      fontWeight: "bold",
                    }}
                  >
                    {space.Nombre}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "11px",
                        mr: 2,
                      }}
                    >
                      Disponible: {space.Capacidad}
                    </Typography>

                    <IconButton size="small" onClick={(e) => handleMenuClick(e, space.idEstacionamiento)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Create New Parking Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#770275",
              borderRadius: "13px",
              textTransform: "none",
              marginBottom:"2rem",
              py: 1.5,
              px: 3,
              boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "0.1px solid rgba(0, 0, 0, 0.5)",
              "&:hover": {
                bgcolor: "#5c0159",
              },
            }}
            onClick={() => navigate(`/AddEstacionamiento`)}
          >
            <Typography
              sx={{
                fontFamily: "Orbitron-Bold, Helvetica",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              Crear nuevo estacionamiento
            </Typography>
            
          </Button>
        </Box>
      </Box>
      <AdminNav></AdminNav>
    </Container>
  );
};

export default Estacionamientos;
