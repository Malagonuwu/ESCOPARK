import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/General/Header";
import AdminNav from "../../components/General/AdminNav";

const HomeAdministrativo = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
        display:"flex", 
        flexDirection:"column", 
        width:"100%",
        margin: 0,
        padding: 0,
        backgroundColor: "White",
        overflowX: "hidden",
        position:"relative",
        height:"100vh"
    }}>
      <Header sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"
      />
      <Box sx={{height:"100%",display:"flex", flexDirection:"column", alignItems:"center", padding:"0.5rem"}}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, Sans-Serif",
            fontWeight: "bold",
            textAlign:"center",
            fontSize: "18px",
            mt:"1rem"
          }}>
          Bienvenido Administrador!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, Sans-Serif",
            fontSize: "14px",
            textAlign:"center",
            mt:"1rem"
          }}>
          Através de este sistema podrás gestionar los estacionamientos, guardias y usuarios.
        </Typography>

        <Box sx={{ display: "flex", flexDirection:"column", justifyContent: "center", rowGap:"2rem", mt:"2rem", mb:"2rem"}}>
            <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "3rem",
                        bgcolor: "#770275",
                        borderRadius: "13px",
                        fontFamily: "Orbitron, Sans-Serif",
                        fontWeight: "bold",
                        textTransform: "none",
                        padding:"0.3rem",
                        fontSize: "0.9rem",
                        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => navigate('/Usuarios')}
                    >
                Gestionar Usuarios
            </Button>
            <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "3rem",
                        bgcolor: "#770275",
                        borderRadius: "13px",
                        fontFamily: "Orbitron, Sans-Serif",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "0.9rem",
                        padding:"0.3rem",
                        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => navigate('/Estacionamientos')}
                    >
                Gestionar Estacionamientos
            </Button>
            <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "3rem",
                        bgcolor: "#770275",
                        borderRadius: "13px",
                        fontFamily: "Orbitron, Sans-Serif",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "0.9rem",
                        padding:"0.3rem",
                        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => navigate('/Guardias')}
                    >
                Crear Guardia
            </Button>
        </Box>
      </Box>
      <AdminNav/>
    
    </Box>
    
  );
};
export default HomeAdministrativo;
