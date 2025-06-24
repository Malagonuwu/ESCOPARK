import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const tabs = [
  { label: "Inicio", icon: <HomeIcon />, paths: ["/home-administrativo"] },
  {
    label: "Usuarios",
    icon: <GroupIcon />,
    paths: ["/Usuarios", "/EditUsuario/:id"],
  },
  { label: "Guardias", icon: <LocalPoliceIcon />, paths: ["/Guardias"] },
  {
    label: "Estacionamientos",
    icon: <LocalParkingIcon />,
    paths: [
      "/Estacionamientos",
      "/EditEstacionamiento/:id",
      "/AddEstacionamiento",
    ],
  },
  { label: "Salir", icon: <LogoutIcon />, paths: ["/Login"] },
];

const NavegationBar = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const index = tabs.findIndex((tab) =>
      tab.paths?.some((p) =>
        p.includes(":")
          ? location.pathname.startsWith(p.split("/:")[0])
          : p === location.pathname
      )
    );
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
            to={tab.paths[0]}
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
