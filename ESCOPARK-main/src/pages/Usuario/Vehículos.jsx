import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  CircularProgress,
  Divider,
  Chip,
  Grid,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DirectionsCar, TwoWheeler, Edit, AddAPhoto } from "@mui/icons-material";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";

// Importar supabase client
import { supabase } from "../../supabaseClient";

const Vehiculos = () => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Leer perfil de localStorage para obtener id_usuario
  const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
  const id_usuario = perfil.id_usuario;

  useEffect(() => {
    if (!id_usuario) {
      alert("No se encontró el usuario logueado.");
      navigate("/login");
      return;
    }

    const fetchVehiculos = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from("vehiculos")
          .select("*")
          .eq("id_usuario", id_usuario)
          .order("id_vehiculo", { ascending: false });

        if (error) throw error;

        setVehiculos(data || []);
      } catch (error) {
        console.error("Error al obtener vehículos:", error.message);
        alert("Error al obtener vehículos: " + error.message);
        setVehiculos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, [id_usuario, navigate]);

  const handleFotoChange = async (e, id_vehiculo) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Subir la imagen a Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${id_vehiculo}_${Date.now()}.${fileExt}`;
      const filePath = `vehiculos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehiculos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('vehiculos')
        .getPublicUrl(filePath);

      // Actualizar la base de datos con la nueva URL
      const { error: updateError } = await supabase
        .from('vehiculos')
        .update({ foto_vehiculo: publicUrl })
        .eq('id_vehiculo', id_vehiculo);

      if (updateError) throw updateError;

      // Actualizar el estado local
      setVehiculos(vehiculos.map(v => 
        v.id_vehiculo === id_vehiculo ? { ...v, foto_vehiculo: publicUrl } : v
      ));

    } catch (error) {
      console.error("Error al cambiar foto:", error);
      alert("Error al actualizar la foto: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const getVehicleIcon = (tipo) => {
    switch (tipo) {
      case 'Auto':
        return <DirectionsCar sx={{ fontSize: 40 }} />;
      case 'Moto':
        return <TwoWheeler sx={{ fontSize: 40 }} />;
      default:
        return <DirectionsCar sx={{ fontSize: 40 }} />;
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        maxWidth: "412px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
        <Header sectionTitle="Mis Vehículos" userName={`${perfil.nombres || "Usuario"} ${perfil.apellido_paterno || ""}`} />

      {/* Contenido principal */}
      <Box sx={{ 
        flex: 1, 
        overflowY: "auto", 
        p: 2,
        backgroundColor: "white",
      }}>
        {loading ? (
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "200px"
          }}>
            <CircularProgress />
          </Box>
        ) : vehiculos.length === 0 ? (
          <Box sx={{ 
            textAlign: "center", 
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}>
            <DirectionsCar sx={{ fontSize: 60, color: "text.disabled" }} />
            <Typography variant="h6" color="text.secondary">
              No tienes vehículos registrados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Agrega tu primer vehículo para comenzar
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {vehiculos.map((vehiculo) => (
              <Grid item xs={12} key={vehiculo.id_vehiculo}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Foto del vehículo */}
                      <Grid item xs={4}>
                        <Box sx={{ 
                          position: "relative",
                          display: "flex",
                          justifyContent: "center"
                        }}>
                          <Avatar
                            variant="rounded"
                            src={vehiculo.foto_vehiculo}
                            sx={{ 
                              width: 100, 
                              height: 80, 
                              bgcolor: "grey.100",
                            }}
                          >
                            {!vehiculo.foto_vehiculo && getVehicleIcon(vehiculo.tipo_vehiculo)}
                          </Avatar>
                          <IconButton
                            component="label"
                            sx={{
                              position: "absolute",
                              bottom: -8,
                              right: -8,
                              bgcolor: "primary.main",
                              color: "white",
                              "&:hover": {
                                bgcolor: "primary.dark"
                              }
                            }}
                            size="small"
                            disabled={uploading}
                          >
                            <AddAPhoto fontSize="small" />
                            <input 
                              type="file" 
                              accept="image/*" 
                              hidden 
                              onChange={(e) => handleFotoChange(e, vehiculo.id_vehiculo)} 
                            />
                          </IconButton>
                        </Box>
                      </Grid>

                      {/* Información del vehículo */}
                      <Grid item xs={8}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {vehiculo.marca} {vehiculo.modelo}
                          </Typography>
                          <Chip 
                            label={vehiculo.tipo_vehiculo} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <Box component="span" fontWeight="bold">Placas:</Box> {vehiculo.placas}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <Box component="span" fontWeight="bold">Color:</Box> {vehiculo.color}
                            </Typography>
                          </Grid>
                        </Grid>

                        {vehiculo.caracteristicas && (
                          <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">
                              <Box component="span" fontWeight="bold">Características:</Box> {vehiculo.caracteristicas}
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>

                  {/* Acciones */}
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    p: 1,
                    bgcolor: "grey.50",
                    borderTop: "1px solid",
                    borderColor: "divider"
                  }}>
                    <Button
                      startIcon={<Edit />}
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/vehiculos/editar/${vehiculo.id_vehiculo}`)}
                    >
                      Editar
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Botón para agregar vehículo */}
      <Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddAPhoto />}
          onClick={() => navigate("/vehiculos/agregar")}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Agregar Vehículo
        </Button>
      </Box>

      {/* Navbar */}
      <NavegationBar />
    </Container>
  );
};

export default Vehiculos;