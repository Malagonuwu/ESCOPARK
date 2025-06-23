import React from "react";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ComponenteVehiculo = () => {
  return (
    <Box sx={{
      position: "relative",
      width: "100%",
      height: "46px",
      display: "flex",
      alignItems: "center",
      marginBottom:"1rem"
    }}>
      {/* Contenedor principal del vehículo */}
      <Box sx={{
        borderRadius: "13px",
        height: "46px",
        width: "56%",
        backgroundColor: "#ffffff",
        border: "0.1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        paddingLeft: "56px"
      }}>
        {/* Imagen del vehículo */}
        <Box
          component="img"
          src={carroPrueba}
          alt="Miautogdl"
          sx={{
            height: "34px",
            width: "42px",
            objectFit: "cover",
            position: "absolute",
            left: "7px",
            borderRadius:"0.5rem"
          }}
        />
        
        {/* Información del vehículo */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "8px"
        }}>
          <Typography sx={{
            fontFamily: '"Orbitron-Bold", Helvetica',
            fontWeight: 700,
            fontSize: "13px",
            whiteSpace: "nowrap",
            lineHeight: 1
          }}>
            Chevrolet Aveo 2015
          </Typography>
          
          <Typography sx={{
            fontFamily: '"Orbitron-Regular", Helvetica',
            fontWeight: 400,
            fontSize: "8px",
            lineHeight: 1.2,
            whiteSpace: "nowrap"
          }}>
            TKM2ICKKCK
          </Typography>
          
          <Typography sx={{
            fontFamily: '"Orbitron-Regular", Helvetica',
            fontWeight: 400,
            fontSize: "11px",
            whiteSpace: "nowrap"
          }}>
            PLATEADO
          </Typography>
        </Box>
      </Box>

      {/* Botón de eliminar */}
      <Box sx={{
        backgroundColor: "#770275",
        border: "0.1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "13px",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
        height: "46px",
        width: "49px",
        marginLeft: "23px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#5c0159"
        }
      }}>
        <DeleteIcon sx={{
          color: "white",
          fontSize: "32px"
        }} />
      </Box>
    </Box>
  );
};