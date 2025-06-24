import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import happy from "../../assets/happy.png";

const ModalAccRealizada = ({
  open,
  onClose,
  mensaje = "Acción completada con éxito.",
  tipo = "success", // 'success' o 'error'
  showImage = true,
}) => {
  const esExito = tipo === "success";

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
          outline: "none",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            px: 1,
            py: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
              gap: 2,
            }}
          >
            {/* Contenido del mensaje y botón */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.3px",
                  mb: 1,
                }}
              >
                {mensaje}
              </Typography>

              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  onClick={onClose}
                  sx={{
                    bgcolor: esExito ? "#007E33" : "#B00020",
                    textTransform: "none",
                    width: 100,
                    height: 35,
                    fontSize: 12,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: esExito ? "#005C26" : "#8C001A",
                    },
                  }}
                >
                  OK
                </Button>
              </Box>
            </Box>

            {/* Imagen */}
            {showImage && (
              <Box>
                <Box
                  component="img"
                  src={happy}
                  alt="Gatito feliz"
                  sx={{ width: 119 }}
                />
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ModalAccRealizada;
