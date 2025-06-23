import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const RegistrarEntradaModal = ({ open, onClose, onSubmit }) => {
  const [codigo, setCodigo] = useState("");

  const handleAceptar = () => {
    if (codigo.trim()) {
      onSubmit(codigo);
      setCodigo("");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", borderRadius: 2, boxShadow: 24,
          p: 4, width: 300
        }}
      >
        <Typography variant="h6" mb={2}>Código a ingresar</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAceptar}
        >
          Aceptar
        </Button>
      </Box>
    </Modal>
  );
};

export default RegistrarEntradaModal;
