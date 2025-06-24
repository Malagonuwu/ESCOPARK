import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React,{useState,useEffect} from "react";
import Header from "../../components/General/Header.jsx";
import NavegationBar from "../../components/General/AdminNav.jsx";


const PantallaGestionDe = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/get-users");
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await response.json();
        setUsers(data);
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
    <Box sx={{
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
      <Header sectionTitle="Estacionamientos"
          userName="Administrador"
          showAvatar={false}
          backgroundColor="rgba(119, 2, 117, 0.77)"
      />

      <Box sx={{marginTop:"2rem",padding:"1rem",bgcolor: "white", display: "flex", flexDirection:"column", justifyContent: "center", width: "100%"}}>

        {/* Title */}
        <Typography sx={{top: "192px", left: "20px", fontFamily: "Orbitron, sans-serif", fontWeight: 700, color: "black", fontSize: "18px"}}>
          Gestión de usuarios
        </Typography>

        <Divider
          sx={{
            width: "90%",
            height: "2px",
            color:"#000",
            top: "229px",
            left: "18px",
            marginBottom:"2rem"
          }}
        />

        <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            bgcolor: "white",
            width: "90%",
          }}
        >

          {/* Search Bar */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 2,
              width: "80%",
              height:"1rem",
              borderRadius: "2rem",
              border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
          >
          <SearchIcon sx={{ color: "text.secondary" }} />
            <Autocomplete
              freeSolo
              options={[]}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Buscar"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
            <IconButton size="small">
            </IconButton>
          </Paper>

                  {/* User Cards */}
          {users.map((user, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                height:"4.5rem",
                marginTop:"1.2rem",
              }}
            >
              <Card
                sx={{
                  width: "307px",
                  height: "100%",
                  borderRadius: "13px",
                  border: "0.1px solid rgba(0, 0, 0, 0.5)",
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ ml: 2 }}>
                  <PersonIcon sx={{ width: 48, height: 48 }} />
                </Box>
                <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                  <Typography
                    sx={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {user.nombres} {user.apellido_paterno} {user.apellido_materno}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 400,
                      fontSize: "8px",
                    }}
                  >
                    {user.id_usuario}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 400,
                      fontSize: "11px",
                    }}
                  >
                    Vehículos: {user.vehicles}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: "25%",
                  height: "%100",
                  padding:"0.2rem",
                  borderRadius: "13px",
                  bgcolor: "#770275",
                  border: "0.1px solid rgba(0, 0, 0, 0.5)",
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/EditUsuario/${user.id_usuario}`)}
              >
                <EditIcon sx={{ color: "white", width: 36, height: 33 }} />

              </Card>
            </Stack>
          ))}
        </Box>
    </Box>
    <NavegationBar/>
    
    </Box>
    
  );
};

export default PantallaGestionDe;