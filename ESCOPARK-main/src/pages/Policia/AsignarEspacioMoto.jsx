import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Alert,
} from "@mui/material";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AsignarEspacioMoto = () => {
  const [motos, setMotos] = useState([]);
  const [espacios, setEspacios] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState("");
  const [espacioSeleccionado, setEspacioSeleccionado] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      // 1. Registros activos sin espacio asignado ni salida
      const { data: registros, error: errorReg } = await supabase
        .from("registros")
        .select("id_registro, id_vehiculo, fecha_entrada, fecha_salida, tipo_registro")
        .eq("tipo_registro", "Entrada")
        .is("fecha_salida", null)
        .is("id_espacio", null);

      if (errorReg) {
        console.error("❌ Error al obtener registros:", errorReg.message);
        return;
      }

      // 2. Vehículos tipo "Moto"
      const { data: vehiculos, error: errorVeh } = await supabase
        .from("vehiculos")
        .select("id_vehiculo, tipo_vehiculo, marca, modelo")
        .eq("tipo_vehiculo", "Moto");

      if (errorVeh) {
        console.error("❌ Error al obtener vehículos:", errorVeh.message);
        return;
      }

      // 3. Filtrar registros que correspondan a motos activas
      const motosActivas = registros?.filter(r =>
        vehiculos?.some(v => v.id_vehiculo === r.id_vehiculo)
      ).map(r => {
        const vehiculo = vehiculos.find(v => v.id_vehiculo === r.id_vehiculo);
        return { ...r, vehiculo };
      });

      // 4. Obtener espacios con estado 'Libre'
      const { data: espaciosLibres, error: errorEsp } = await supabase
        .from("espacios")
        .select("id_espacio, numero, estado")
        .eq("estado", "Libre");

      if (errorEsp) {
        console.error("❌ Error al obtener espacios:", errorEsp.message);
        return;
      }

      setMotos(motosActivas || []);
      setEspacios(espaciosLibres || []);
    };

    fetchDatos();
  }, []);

  const asignarEspacio = async () => {
    const idEspacio = parseInt(espacioSeleccionado);
    const idRegistro = parseInt(registroSeleccionado);

    // 1. Asignar espacio al registro
    const { error: regError } = await supabase
      .from("registros")
      .update({ id_espacio: idEspacio })
      .eq("id_registro", idRegistro);

    // 2. Actualizar estado del espacio a 'Ocupado'
    const { error: espError } = await supabase
      .from("espacios")
      .update({ estado: "Ocupado" })
      .eq("id_espacio", idEspacio);

    if (!regError && !espError) {
      setMensaje({ tipo: "success", texto: "✅ Espacio asignado exitosamente" });
      setTimeout(() => navigate("/entradas-salidas"), 1500);
    } else {
      setMensaje({ tipo: "error", texto: "❌ Error al asignar espacio" });
      console.error("Errores:", regError, espError);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛵 Asignar Espacio a Moto
      </Typography>
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Moto</InputLabel>
          <Select
            value={registroSeleccionado}
            label="Moto"
            onChange={(e) => setRegistroSeleccionado(e.target.value)}
          >
            {motos.map((m) => (
              <MenuItem key={m.id_registro} value={m.id_registro}>
                {`${m.vehiculo.marca} ${m.vehiculo.modelo} (ID Vehículo: ${m.id_vehiculo})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Espacio disponible</InputLabel>
          <Select
            value={espacioSeleccionado}
            label="Espacio disponible"
            onChange={(e) => setEspacioSeleccionado(e.target.value)}
          >
            {espacios.map((e) => (
              <MenuItem key={e.id_espacio} value={e.id_espacio}>
                {`Espacio #${e.numero}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          disabled={!registroSeleccionado || !espacioSeleccionado}
          onClick={asignarEspacio}
        >
          Asignar espacio
        </Button>

        {mensaje && (
          <Alert severity={mensaje.tipo} sx={{ mt: 2 }}>
            {mensaje.texto}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AsignarEspacioMoto;
