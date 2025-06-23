import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import { supabase } from "../../supabaseClient";

const Acceso = () => {
  const navigate = useNavigate();
  const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
  const id_usuario = perfil.id_usuario;

  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [registroActivo, setRegistroActivo] = useState(null); // ← código activo

  useEffect(() => {
    const fetchVehiculosYRegistro = async () => {
      setLoading(true);
      try {
        const { data: vehiculosData, error: vehiculosError } = await supabase
          .from("vehiculos")
          .select("*")
          .eq("id_usuario", id_usuario);

        if (vehiculosError) throw vehiculosError;

        setVehiculos(vehiculosData || []);

        const idsVehiculos = vehiculosData.map(v => v.id_vehiculo);
        if (idsVehiculos.length > 0) {
          const { data: registros, error: registrosError } = await supabase
            .from("registros")
            .select("*")
            .in("id_vehiculo", idsVehiculos)
            .is("fecha_salida", null)
            .order("fecha_entrada", { ascending: false })
            .limit(1);

          if (registrosError) throw registrosError;
          if (registros.length > 0) setRegistroActivo(registros[0]);
        }

      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id_usuario) fetchVehiculosYRegistro();
  }, [id_usuario]);

  const generarCodigo = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    return (
      letras.charAt(Math.floor(Math.random() * letras.length)) +
      numeros.charAt(Math.floor(Math.random() * numeros.length)) +
      numeros.charAt(Math.floor(Math.random() * numeros.length)) +
      numeros.charAt(Math.floor(Math.random() * numeros.length))
    );
  };

  const handleGenerarCodigo = async () => {
    const codigo = generarCodigo();
    const ahora = new Date();
    const validoHasta = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      22, 0, 0
    );

    try {
      const { error } = await supabase
        .from("registros")
        .insert([
          {
            id_vehiculo: vehiculoSeleccionado.id_vehiculo,
            codigo_acceso: codigo,
            tipo_registro: "Entrada",
            valido_hasta: validoHasta.toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      navigate(`/codigo-generado/${codigo}`);
    } catch (error) {
      console.error("Error al generar código:", error.message);
      alert("No se pudo generar el código.");
    }
  };

  const getVehicleIcon = (tipo) => {
    switch (tipo) {
      case "Auto":
        return <DirectionsCar sx={{ fontSize: 40 }} />;
      case "Moto":
        return <TwoWheeler sx={{ fontSize: 40 }} />;
      default:
        return <DirectionsCar sx={{ fontSize: 40 }} />;
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
      <Header
        sectionTitle="Elegir Vehículo"
        userName={`${perfil.nombres || "Usuario"} ${perfil.apellido_paterno || ""}`}
      />

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : vehiculos.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={4}>
            No hay vehículos disponibles
          </Typography>
        ) : (
          <>
            {registroActivo && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Ya tienes un código activo. Solo puedes registrar un vehículo a la vez.
              </Alert>
            )}

            <Grid container spacing={2}>
              {vehiculos.map((vehiculo) => (
                <Grid item xs={12} key={vehiculo.id_vehiculo}>
                  <Card
                    onClick={() => setVehiculoSeleccionado(vehiculo)}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 1,
                      cursor: "pointer",
                      border:
                        vehiculoSeleccionado?.id_vehiculo === vehiculo.id_vehiculo
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <Avatar
                        variant="rounded"
                        src={vehiculo.foto_vehiculo}
                        sx={{ width: 80, height: 60, bgcolor: "grey.100" }}
                      >
                        {!vehiculo.foto_vehiculo && getVehicleIcon(vehiculo.tipo_vehiculo)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography fontWeight="bold">
                          {vehiculo.marca} {vehiculo.modelo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Placas: {vehiculo.placas}
                        </Typography>
                      </Box>
                      <Chip label={vehiculo.tipo_vehiculo} color="primary" size="small" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        {!registroActivo ? (
          <Button
            fullWidth
            variant="contained"
            disabled={!vehiculoSeleccionado}
            sx={{ py: 1.5, borderRadius: 2, fontWeight: "bold" }}
            onClick={handleGenerarCodigo}
          >
            Generar Código
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, borderRadius: 2, fontWeight: "bold" }}
            onClick={() => navigate(`/codigo-generado/${registroActivo.codigo_acceso}`)}
          >
            Mi Código
          </Button>
        )}
      </Box>

      <NavegationBar />
    </Container>
  );
};

export default Acceso;
