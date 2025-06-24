import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography,
  Avatar,
  CircularProgress,
  Alert
} from "@mui/material";
import { DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import CustomButton from "../../components/General/CustomButton";
import { supabase } from "../../supabaseClient";

const Acceso = () => {
  const navigate = useNavigate();
  const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
  const id_usuario = perfil.id_usuario;

  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [registroActivo, setRegistroActivo] = useState(null);

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Header
        sectionTitle="Acceso"
        userName={`${perfil.nombres || "Usuario"} ${perfil.apellido_paterno || ""}`}
        showBackgroundImage={false}
        backgroundColor="#002250"
      />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter, Helvetica",
            textAlign: "center",
            fontSize: "14px",
            width: "85%",
          }}
        >
          Seleccione el vehículo que desea ingresar al estacionamiento
        </Typography>

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
              <Alert severity="info" sx={{ width: "85%", mb: 2 }}>
                Ya tienes un código activo. Solo puedes registrar un vehículo a la vez.
              </Alert>
            )}

            {vehiculos.map((vehiculo) => (
              <Box
                key={vehiculo.id_vehiculo}
                onClick={() => setVehiculoSeleccionado(vehiculo)}
                sx={{
                  width: "85%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  border: vehiculoSeleccionado?.id_vehiculo === vehiculo.id_vehiculo
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Avatar
                  variant="rounded"
                  src={vehiculo.foto_vehiculo}
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    bgcolor: "grey.100",
                  }}
                >
                  {!vehiculo.foto_vehiculo && getVehicleIcon(vehiculo.tipo_vehiculo)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">
                    {vehiculo.marca} {vehiculo.modelo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehiculo.placas}
                  </Typography>
                </Box>
                <Typography variant="caption" color="primary">
                  {vehiculo.tipo_vehiculo}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>

      <Box sx={{ py: 20, display: "flex", justifyContent: "center"}}>
        {!registroActivo ? (
          <CustomButton
            name="Generar Código"
            width="70%"
            disabled={!vehiculoSeleccionado}
            onClick={handleGenerarCodigo}
          />
        ) : (
          <CustomButton
            name="Mi Código"
            width="70%"
            onClick={() => navigate(`/codigo-generado/${registroActivo.codigo_acceso}`)}
          />
        )}
      </Box>

      <NavegationBar />
    </Container>
  );
};

export default Acceso;