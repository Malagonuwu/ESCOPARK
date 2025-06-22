import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
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
import React from "react";

const userData = [
  {
    id: "2022630175",
    name: "David Martínez",
    vehicles: 1,
  },
  {
    id: "2022630175",
    name: "David Martínez",
    vehicles: 1,
  },
  {
    id: "2022630175",
    name: "David Martínez",
    vehicles: 1,
  },
];

const PantallaGestionDe = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          overflow: "hidden",
          width: "440px",
          height: "956px",
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            width: "440px",
            height: "179px",
            background: "linear-gradient(to right, #770275, #4B0082)",
          }}
        >
          <Box
            component="img"
            sx={{
              position: "absolute",
              width: "440px",
              height: "72px",
              top: 0,
              left: 0,
            }}
            alt="Header"
            src="header.svg"
          />

          <Box
            component="img"
            sx={{
              position: "absolute",
              width: "45px",
              height: "45px",
              top: "13px",
              left: "325px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            alt="User avatar"
            src="image-3.png"
          />

          <ArrowDropDownIcon
            sx={{
              position: "absolute",
              width: "15px",
              height: "24px",
              top: "24px",
              left: "398px",
              color: "white",
            }}
          />

          <Typography
            sx={{
              position: "absolute",
              top: "27px",
              left: "375px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              color: "white",
              fontSize: "15px",
              whiteSpace: "nowrap",
            }}
          >
            ad
          </Typography>

          <Typography
            sx={{
              position: "absolute",
              top: "27px",
              left: "20px",
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              color: "white",
              fontSize: "18px",
            }}
          >
            Administrador
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            position: "absolute",
            top: "192px",
            left: "20px",
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            color: "black",
            fontSize: "18px",
          }}
        >
          Gestión de usuarios
        </Typography>

        <Divider
          sx={{
            position: "absolute",
            width: "403px",
            height: "1px",
            top: "229px",
            left: "18px",
          }}
        />

        {/* Search Bar */}
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
            position: "absolute",
            top: "243px",
            left: "29px",
            width: "382px",
            borderRadius: "24px",
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
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 400,
                    fontSize: "8px",
                  }}
                >
                  {user.id}
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
            >
              <EditIcon sx={{ color: "white", width: 36, height: 33 }} />
            </Card>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default PantallaGestionDe;
