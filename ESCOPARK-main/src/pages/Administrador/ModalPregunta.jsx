import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalPregunta= ({
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

        {/* Mensaje dinámico */}
        <Typography
          variant="h6"
          fontWeight="bold"
          fontFamily="audiowide, sans-serif"
          textAlign="center"
        >
          {mensaje}
        </Typography>

        {/* Botones de acción */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          gap={2}
          mt={2}
        >
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{
              bgcolor: "#B00020", // rojo
              "&:hover": {
                bgcolor: "#8C001A",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={onConfirm}
            fullWidth
            sx={{
              bgcolor: "#007E33", // verde
              "&:hover": {
                bgcolor: "#005C26",
              },
            }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPregunta;
