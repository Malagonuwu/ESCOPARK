import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const ModalAccRealizada = ({
  open,
  onClose,
  mensaje = "Acción completada con éxito.",
  tipo = "success", // 'success' o 'error'
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
          width: 320,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Ícono de estado */}
        <Avatar
          sx={{
            bgcolor: esExito ? "#007E33" : "#B00020",
            width: 70,
            height: 70,
          }}
        >
          {esExito ? (
            <CheckCircleIcon sx={{ fontSize: 40, color: "white" }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 40, color: "white" }} />
          )}
        </Avatar>

        {/* Mensaje */}
        <Typography
          variant="h6"
          fontWeight="bold"
          fontFamily="audiowide, sans-serif"
          textAlign="center"
        >
          {mensaje}
        </Typography>

        {/* Botón OK */}
        <Box mt={2} width="100%">
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{
              bgcolor: esExito ? "#007E33" : "#B00020",
              "&:hover": {
                bgcolor: esExito ? "#005C26" : "#8C001A",
              },
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAccRealizada;
