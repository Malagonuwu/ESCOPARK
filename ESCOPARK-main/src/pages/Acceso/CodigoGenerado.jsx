import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import { supabase } from "../../supabaseClient";

const CodigoGenerado = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteCodigo = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from("registros")
        .delete()
        .eq("codigo_acceso", codigo);

      if (error) throw error;

      // Redirigir a selección de vehículo
      navigate("/acceso");
    } catch (error) {
      console.error("Error al eliminar el código:", error.message);
      alert("No se pudo eliminar el código.");
    } finally {
      setDeleting(false);
      setOpenDialog(false);
    }
  };

  return (
    <Container
      disableGutters
      sx={{
        width: "412px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <Header sectionTitle="Código de Acceso" userName="App" />

      {/* Contenido */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tu código de acceso es:
        </Typography>
        <Typography variant="h2" color="primary" fontWeight="bold">
          {codigo}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
          Presenta este código en el punto de control. Válido hasta las 10:00 PM de hoy.
        </Typography>

        {/* Botón eliminar */}
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 4 }}
          onClick={() => setOpenDialog(true)}
        >
          Eliminar código
        </Button>
      </Box>

      {/* Navbar */}
      <NavegationBar />

      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>¿Eliminar código?</DialogTitle>
        <DialogContent>
          <Typography>
            Si eliminas este código, ya no será válido y deberás generar uno nuevo para acceder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteCodigo}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CodigoGenerado;
