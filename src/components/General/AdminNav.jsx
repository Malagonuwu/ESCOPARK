import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const tabs = [
  { label: "Usuarios", icon: <GroupIcon />, path: "/Usuarios" },
  { label: "Guardias", icon: <LocalPoliceIcon />, path: "/Guardias" },
  {
    label: "Estacionamientos",
    icon: <LocalParkingIcon />,
    path: "/Estacionamientos",
  },
  { label: "Salir", icon: <LogoutIcon />, path: "/Login" },
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
          backgroundColor: "#770275",
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
                color: "#ffa5fd",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default NavegationBar;
