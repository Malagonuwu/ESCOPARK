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
    <Box
      sx={{
        display:"flex", 
        flexDirection:"column", 
        minHeight:"100vh", 
        width:"100%",
        margin: 0,
        padding: 0,
        backgroundColor: "White",
        overflowX: "hidden",
        position:"relative"
      }}>

      {/* Header */}
      <Header
        sectionTitle="Estacionamientos"
        userName="Administrador"
        showAvatar={false}
        backgroundColor="rgba(119, 2, 117, 0.77)"
      />
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems:"center",
          backgroundColor: "white",
          marginBottom:"2rem"
        }}>
      

        {/* Main Content */}
        <Box sx={{ px: 2, mt: 2 , height:"100%"}}>
          {/* Parking Spaces List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {parkingSpaces.map((space) => (
              <Card
                key={space.id}
                sx={{
                  borderRadius: "1rem",
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
          <Box sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            margin:"2rem"
          }}>
            <Button variant="contained"
              sx={{
                fontFamily: "Orbitron, Sans-Serif",
                width: "11rem",
                height: "2.8rem",
                padding:"1.6rem",
                bgcolor:  "#770275",
                borderRadius: "0.6rem",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "0.1px solid rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#007a8a",
                },
              }}>
              Crear nuevo estacionamiento
            </Button>
          </Box>

          <Box>
            <Typography sx={{
                          fontFamily: "Orbitron, Sans-Serif",
                          fontSize: "1rem",
                          mr: 1,
                        }}>
              Estadísticas de estacionamientos
            </Typography>
            <Box sx={{
                marginTop:"1rem",
                fontFamily: "Orbitron, Sans-Serif",
                fontSize:"0.8rem",
                backgroundColor:"#ddd",
                padding:"1rem",
                borderRadius:"0.6rem",
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)"
              }}>
                Entradas semanales:
                <br /><br />
                Número de vehículos:
            </Box>            
          </Box>
        </Box>

      </Container>
      
      {/*Navbar*/}
      <NavegationBar/>
    </Box>
    
  );
};

export default Estacionamientos;
