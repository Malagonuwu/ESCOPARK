import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Botón editar
import EditButton from "../General/CustomButton";

const ModalVehiculo = ({ open, onClose, vehiculo }) => {
  if (!vehiculo) return null;

  const { avatar, nombre, tipo, marca, modelo, placas, descripcion } = vehiculo;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Cerrar */}
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

        {/* Nomnre y foto */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar src={avatar} sx={{ width: 70, height: 70 }} />
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily={"audiowide, sans-serif"}
          >
            {nombre}
          </Typography>
          <Divider sx={{ width: "100%", my: 1 }} />
        </Box>

        {/* Características */}
        <Grid container spacing={1} sx={{ pl: 2 }}>
          <Grid item xs={6}>
            <Typography fontSize={14} fontFamily={"inter, sans-serif"}>
              <strong>Tipo:</strong> {tipo}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} fontFamily={"inter, sans-serif"}>
              <strong>Marca:</strong> {marca}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} fontFamily={"inter, sans-serif"}>
              <strong>Modelo:</strong> {modelo}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} fontFamily={"inter, sans-serif"}>
              <strong>Placas:</strong> {placas}
            </Typography>
          </Grid>
        </Grid>

        {/* Descripción */}
        <Box mt={2} sx={{ pl: 1 }}>
          <Typography fontSize={14} fontFamily={"inter, sans-serif"}>
            <strong>Descripción:</strong> {descripcion}
          </Typography>
        </Box>

        {/* Botón Editar */}
        <Box mt={3} display="flex" justifyContent="center">
          <EditButton
            to={"/AddVehiculo"}
            name="Editar"
            sx={{
              width: "100%",
              bgcolor: "#002250",
              "&:hover": {
                bgcolor: "#003366",
              },
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalVehiculo;
