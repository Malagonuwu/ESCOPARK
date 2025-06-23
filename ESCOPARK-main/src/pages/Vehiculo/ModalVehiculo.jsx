import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Grid,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const ModalVehiculo = ({ open, onClose, vehiculo }) => {
  const navigate = useNavigate();

  if (!vehiculo) return null;

  const {
    id_vehiculo,
    foto_vehiculo,
    marca,
    modelo,
    tipo_vehiculo,
    placas,
    caracteristicas,
  } = vehiculo;

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

        {/* Avatar y título */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar
            src={foto_vehiculo}
            sx={{ width: 70, height: 70, bgcolor: "grey.300" }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily={"audiowide, sans-serif"}
            textAlign="center"
          >
            {marca} {modelo}
          </Typography>
          <Divider sx={{ width: "100%", my: 1 }} />
        </Box>

        {/* Información */}
        <Grid container spacing={1} sx={{ pl: 2 }}>
          <Grid item xs={6}>
            <Typography fontSize={14}><strong>Tipo:</strong> {tipo_vehiculo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14}><strong>Marca:</strong> {marca}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14}><strong>Modelo:</strong> {modelo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14}><strong>Placas:</strong> {placas}</Typography>
          </Grid>
        </Grid>

        {/* Características */}
        {caracteristicas && (
          <Box mt={2} sx={{ pl: 1 }}>
            <Typography fontSize={14}>
              <strong>Características:</strong> {caracteristicas}
            </Typography>
          </Box>
        )}

        {/* Botón Editar */}
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(`/vehiculos/editar/${id_vehiculo}`)}
            sx={{
              bgcolor: "#002250",
              "&:hover": {
                bgcolor: "#003366",
              },
            }}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalVehiculo;
