import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from '../../supabaseClient'
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
import React,{ useEffect, useState }   from "react";
import NavegationBar from "../../components/General/AdminNav";
import Header from "../../components/General/Header";

const PantallaGestionDe = () => {
  const [userData, setUserData] = useState([]);
    useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from("usuarios").select("*");
      console.log("DATA:", data);
      console.log("ERROR:", error);
      if (error) {
        console.error("Error al cargar usuarios:", error.message);
      } else {
        setUserData(data);
      }
    };

    fetchUsuarios();
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
            width: "100%",
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
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>

        {/* User Cards */}
        {userData.map((user, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              width: "382px",
              height: "62px",
              top: `${322 + index * 94}px`,
              left: "29px",
            }}
          >
            <Card
              sx={{
                width: "307px",
                height: "62px",
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
                  {user.nombres}
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
                width: "67px",
                height: "62px",
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
