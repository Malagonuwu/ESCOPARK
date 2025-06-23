import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Condiciones = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          maxHeight: "80vh",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflowY: "auto",
        }}
      >
        {/* Botón de cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{
            mb: 2,
            fontWeight: "700",
            fontFamily: "Audiowide, sans-serif",
          }}
        >
          Términos y condiciones
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            textAlign: "justify",
          }}
        >
          Al registrarte en esta aplicación, aceptas que tus datos serán usados
          exclusivamente para el funcionamiento del sistema de control de
          acceso. Nos comprometemos a no compartir tu información con terceros.
          Aceptas también seguir las políticas del Instituto y hacer uso
          responsable de los recursos.
          <br />
          <br />
          <strong>Uso de la aplicación:</strong>
          <ul
            style={{
              paddingLeft: "1.2rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <li>
              La aplicación está destinada exclusivamente al control y registro
              de acceso vehicular.
            </li>
            <li>Debes proporcionar información verídica y actualizada.</li>
            <li>
              Está prohibido compartir tus credenciales con otras personas.
            </li>
          </ul>
          <strong>Uso del estacionamiento:</strong>
          <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
            <li>
              El Instituto no se hace responsable por la pérdida parcial o total
              del vehículo ni de los objetos dejados en su interior.
            </li>
            <li>
              El acceso está sujeto a la disponibilidad y al cumplimiento del
              reglamento interno.
            </li>
            <li>Está prohibido estacionarse fuera de las zonas permitidas.</li>
          </ul>
          El incumplimiento de estas normas puede conllevar sanciones conforme
          al reglamento interno.
        </Typography>
      </Box>
    </Modal>
  );
};

export default Condiciones;
