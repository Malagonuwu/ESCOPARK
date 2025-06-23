import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const tabs = [
  { label: "Inicio", icon: <HomeIcon />, path: "/home-Estudiante" },
  { label: "Vehículos", icon: <DirectionsCarIcon />, path: "/vehiculos" },
  { label: "E/S", icon: <VpnKeyIcon />, path: "/Acceso" },
  { label: "Mi status", icon: <BarChartIcon />, path: "/estadisticas" },
  { label: "Perfil", icon: <PersonIcon />, path: "/Profile" },
];

const NavegationBar = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.path === location.pathname);
    if (index !== -1) {
      setValue(index);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: "100%",
        bottom: 0,
        left: 0,
        bgcolor: "#002250",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          backgroundColor: "#002250",
        }}
      >
        {tabs.map((tab, index) => (
          <BottomNavigationAction
            key={index}
            label={tab.label}
            icon={tab.icon}
            component={Link}
            to={tab.path}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "#00bcd4",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default NavegationBar;
