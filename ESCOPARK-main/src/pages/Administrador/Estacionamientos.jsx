import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  return (
    <Container
      disableGutters
      sx={{
        width: "412px",
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
          {parkingSpaces.map((space) => (
            <Card
              key={space.id}
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
                    {space.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron-Regular, Helvetica",
                        fontSize: "11px",
                        mr: 2,
                      }}
                    >
                      Disponible: {space.available}
                    </Typography>

                    <IconButton size="small">
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
            mt: 20,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#770275",
              borderRadius: "13px",
              textTransform: "none",
              py: 1.5,
              px: 3,
              boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "0.1px solid rgba(0, 0, 0, 0.5)",
              "&:hover": {
                bgcolor: "#5c0159",
              },
            }}
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
    </Container>
  );
};

export default Estacionamientos;
