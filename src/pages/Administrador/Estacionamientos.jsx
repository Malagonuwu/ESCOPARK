import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

//Components
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/AdminNav";
import NewButton from "../../components/General/CustomButton";

// Mock data for parking spaces
const parkingSpaces = [
  {
    id: 1,
    name: "Motocicletas A",
    available: 10,
  },
  {
    id: 2,
    name: "Motocicletas B",
    available: 10,
  },
  {
    id: 3,
    name: "Vehículos A",
    available: 10,
  },
  {
    id: 4,
    name: "Vehículos B",
    available: 10,
  },
];

const Estacionamientos = () => {
  return (
    <Container
      sx={{
        width: "412px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <Header
        sectionTitle="Estacionamientos"
        userName="Administrador"
        showAvatar={false}
        backgroundColor="rgba(119, 2, 117, 0.77)"
      />

      {/* Main Content */}
      <Box sx={{ px: 2, mt: 2 }}>
        {/* Parking Spaces List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {parkingSpaces.map((space) => (
            <Card
              key={space.id}
              sx={{
                borderRadius: "4px",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.5)",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter, Sans-Serif",
                      fontWeight: "bold",
                    }}
                  >
                    {space.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: "Orbitron, Sans-Serif",
                        fontSize: "11px",
                        mr: 2,
                      }}
                    >
                      Disponible: {space.available}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Botón nuevo estacionamiento */}
      </Box>

      {/*Navbar*/}
      <NavegationBar />
    </Container>
  );
};

export default Estacionamientos;
