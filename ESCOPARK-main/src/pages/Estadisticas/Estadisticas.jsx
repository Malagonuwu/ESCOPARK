import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";
import { supabase } from "../../supabaseClient";

const Estadisticas = () => {
  const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
  const id_usuario = perfil.id_usuario;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const agruparPorDia = (registros) => {
    const agrupados = {};

    registros.forEach(({ fecha_entrada, fecha_salida }) => {
      const entrada = new Date(fecha_entrada);
      const salida = new Date(fecha_salida);
      const duracionHoras = (salida - entrada) / 1000 / 60 / 60;

      const dia = entrada.toLocaleDateString("es-MX", { weekday: "short" });
      agrupados[dia] = (agrupados[dia] || 0) + duracionHoras;
    });

    // Ordenar días de la semana: lun → dom
    const diasOrden = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
    return diasOrden.map(d => ({
      dia: d,
      horas: Math.round((agrupados[d] || 0) * 100) / 100
    }));
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const { data: vehiculos, error: vehiculosError } = await supabase
          .from("vehiculos")
          .select("id_vehiculo")
          .eq("id_usuario", id_usuario);

        if (vehiculosError) throw vehiculosError;
        const idsVehiculos = vehiculos.map(v => v.id_vehiculo);

        if (idsVehiculos.length > 0) {
          const { data: registros, error: registrosError } = await supabase
            .from("registros")
            .select("fecha_entrada, fecha_salida")
            .in("id_vehiculo", idsVehiculos)
            .not("fecha_salida", "is", null);

          if (registrosError) throw registrosError;
          const agrupados = agruparPorDia(registros);
          setData(agrupados);
        }
      } catch (error) {
        console.error("Error cargando estadísticas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id_usuario) cargarDatos();
  }, [id_usuario]);

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
        sectionTitle="Estadísticas Semanales"
        userName={`${perfil.nombres || "Usuario"} ${perfil.apellido_paterno || ""}`}
      />

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={4}>
            No hay registros para mostrar.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis label={{ value: "Horas", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="horas" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>

      <NavegationBar />
    </Container>
  );
};

export default Estadisticas;
