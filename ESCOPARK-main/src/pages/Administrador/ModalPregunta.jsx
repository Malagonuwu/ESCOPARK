import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";

const ModalPregunta = ({
  open,
  onClose,
  mensaje = "¿Estás seguro de realizar esta acción?",
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 520,
          outline: "none",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            pl: 3,
            pr: 3,
            py: 3,
            position: "relative",
          }}
        >
          {/* Contenido principal */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <Stack spacing={2} justifyContent="space-between" sx={{ flex: 1 }}>
              {/* Mensaje */}
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.3px",
                }}
              >
                {mensaje}
              </Typography>

              {/* Botones */}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={onConfirm}
                  sx={{
                    bgcolor: "#d32f2f",
                    textTransform: "none",
                    width: 100,
                    height: 35,
                    fontSize: 12,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#b71c1c",
                    },
                  }}
                >
                  Confirmar
                </Button>

                <Button
                  variant="contained"
                  onClick={onClose}
                  onMouseEnter={() => setHoveringCancel(true)}
                  onMouseLeave={() => setHoveringCancel(false)}
                  sx={{
                    bgcolor: "#002250",
                    textTransform: "none",
                    fontWeight: 700,
                    width: 100,
                    height: 35,
                    fontSize: 12,
                    "&:hover": {
                      bgcolor: "#000f33",
                    },
                  }}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ModalPregunta;
