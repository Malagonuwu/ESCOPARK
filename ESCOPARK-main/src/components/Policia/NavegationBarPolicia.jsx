import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const tabs = [
  { label: "Inicio", icon: <HomeIcon />, path: "/home-policia" },
  { label: "E/S", icon: <DirectionsWalkIcon />, path: "/entradas-salidas" },
];

const NavegationBarPolicia = () => {
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
        position: "fixed",
        zIndex: 10,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          backgroundColor: "#002250",
          justifyContent: "center",
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

export default NavegationBarPolicia;