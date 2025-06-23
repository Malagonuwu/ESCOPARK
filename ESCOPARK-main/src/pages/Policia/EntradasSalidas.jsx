import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

import Header from "../../components/General/Header";
import NavegationBarPolicia from "../../components/Policia/NavegationBarPolicia";
import { supabase } from "../../supabaseClient";

const TIEMPO_LIMITE_MS = 12 * 60 * 60 * 1000; // 12 horas

const EntradaSalidas = () => {
  const [vehiculosDentro, setVehiculosDentro] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [infracciones, setInfracciones] = useState([]);
  const [motivos, setMotivos] = useState({});
  const [motosSinEspacio, setMotosSinEspacio] = useState([]);
  const [estadisticasEspacios, setEstadisticasEspacios] = useState({
    A: { libre: 0, ocupado: 0, disponibles: [], ocupados: [] },
    B: { libre: 0, ocupado: 0, disponibles: [], ocupados: [] },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      const { data: registrosDentro } = await supabase
        .from("registros")
        .select("*")
        .eq("tipo_registro", "Entrada")
        .is("fecha_salida", null);

      const { data: registrosSalidos } = await supabase
        .from("registros")
        .select("*")
        .eq("tipo_registro", "Salida")
        .not("fecha_salida", "is", null)
        .order("fecha_salida", { ascending: false })
        .limit(10);

      const { data: vehiculos } = await supabase
        .from("vehiculos")
        .select("*");

      const { data: usuarios } = await supabase
        .from("usuarios")
        .select("*");

      const { data: infraccionesData } = await supabase
        .from("infracciones")
        .select("*")
        .order("fecha", { ascending: false });

      const motosActivas = registrosDentro?.filter(r => {
        const v = vehiculos?.find(v => v.id_vehiculo === r.id_vehiculo);
        return v?.tipo_vehiculo === "Moto" && !r.id_espacio;
      });

      setMotosSinEspacio(motosActivas || []);

      const enrich = (registro) => {
        const vehiculo = vehiculos?.find(v => v.id_vehiculo === registro.id_vehiculo);
        const usuario = usuarios?.find(u => u.id_usuario === vehiculo?.id_usuario);
        return { ...registro, vehiculo, usuario };
      };

      setVehiculosDentro((registrosDentro || []).map(enrich));
      setHistorial((registrosSalidos || []).map(enrich));
      setInfracciones((infraccionesData || []).map(enrich));

      const { data: espaciosMotos } = await supabase
        .from("espacios")
        .select("id_espacio, numero, estado");

      const { data: registros } = await supabase
        .from("registros")
        .select("id_espacio, id_vehiculo")
        .is("fecha_salida", null);

      const { data: motos } = await supabase
        .from("vehiculos")
        .select("id_vehiculo, marca, modelo")
        .eq("tipo_vehiculo", "Moto");

      const estadisticas = { A: { libre: 0, ocupado: 0, disponibles: [], ocupados: [] }, B: { libre: 0, ocupado: 0, disponibles: [], ocupados: [] } };

      espaciosMotos?.forEach(e => {
        const grupo = e.numero.startsWith("A") ? "A" : e.numero.startsWith("B") ? "B" : null;
        if (!grupo) return;
        if (e.estado === "Libre") {
          estadisticas[grupo].libre++;
          estadisticas[grupo].disponibles.push(e.numero);
        } else if (e.estado === "Ocupado") {
          const registro = registros?.find(r => r.id_espacio === e.id_espacio);
          const moto = motos?.find(m => m.id_vehiculo === registro?.id_vehiculo);
          const texto = moto ? `${e.numero} - ${moto.marca} ${moto.modelo}` : e.numero;
          estadisticas[grupo].ocupado++;
          estadisticas[grupo].ocupados.push(texto);
        }
      });

      setEstadisticasEspacios(estadisticas);
    };

    fetchDatos();
  }, []);

  const infraccionarVehiculo = async (id_vehiculo, motivoManual) => {
    const fecha = new Date().toISOString();
    const motivo = motivoManual || "Excedió el tiempo permitido de estancia";

    await supabase.from("infracciones").insert([{ id_vehiculo, motivo, fecha }]);
    await supabase.from("vehiculos").update({ habilitado: false }).eq("id_vehiculo", id_vehiculo);

    alert("🚫 Vehículo infraccionado y acceso deshabilitado");
    window.location.reload();
  };

  const eliminarInfraccion = async (id_infraccion, id_vehiculo) => {
    await supabase.from("infracciones").delete().eq("id_infraccion", id_infraccion);
    await supabase.from("vehiculos").update({ habilitado: true }).eq("id_vehiculo", id_vehiculo);

    alert("✅ Infracción eliminada y acceso rehabilitado");
    window.location.reload();
  };

  return (
    <Container disableGutters sx={{ width: "100%", maxWidth: "412px", minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5", paddingBottom: "80px" }}>
      <Header sectionTitle="Entradas y Salidas" userName="Policía" showBackgroundImage={false} backgroundColor="#002250" />
      <Box sx={{ p: 3, flexGrow: 1 }}>

        <Typography variant="h6" gutterBottom>🚗 Vehículos dentro</Typography>
        <List sx={{ bgcolor: "white", borderRadius: 2, mb: 3 }}>
          {vehiculosDentro.length === 0 ? (
            <Typography variant="body2" sx={{ p: 2 }}>No hay vehículos actualmente dentro.</Typography>
          ) : (
            vehiculosDentro.map((v, i) => {
              const tiempoDentro = Date.now() - new Date(v.fecha_entrada).getTime();
              const excedido = tiempoDentro > TIEMPO_LIMITE_MS;
              return (
                <div key={v.id_registro}>
                  <ListItem alignItems="flex-start">
                    <DirectionsCarIcon sx={{ color: "#00bcd4", mr: 1, mt: 1 }} />
                    <ListItemText
                      primary={v.vehiculo ? `${v.vehiculo.marca} ${v.vehiculo.modelo} (${v.vehiculo.placas || "Sin placas"})` : `Vehículo ID: ${v.id_vehiculo} (Sin información)`}
                      secondary={
                        <>
                          {`Entrada: ${new Date(v.fecha_entrada).toLocaleString()}`}
                          {v.usuario && ` | Dueño: ${v.usuario.nombres} ${v.usuario.apellido_paterno} ${v.usuario.apellido_materno}`}
                          {excedido && (<><br /><strong style={{ color: "red" }}>⚠ Tiempo excedido</strong></>)}
                          <TextField
                            label="Motivo (opcional)"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ mt: 1 }}
                            value={motivos[v.id_vehiculo] || ""}
                            onChange={(e) => setMotivos({ ...motivos, [v.id_vehiculo]: e.target.value })}
                          />
                        </>
                      }
                    />
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <Chip label="En campus" color="primary" variant="outlined" size="small" />
                      {v.vehiculo?.habilitado !== false && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={() => infraccionarVehiculo(v.id_vehiculo, motivos[v.id_vehiculo])}
                        >
                          Infraccionar
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                  {i < vehiculosDentro.length - 1 && <Divider />}
                </div>
              );
            })
          )}
        </List>

        {motosSinEspacio.length > 0 && (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mb: 3 }}
            onClick={() => navigate("/asignar-moto")}
          >
            🛵 Asignar espacio a moto
          </Button>
        )}

        <Typography variant="h6" gutterBottom>📝 Últimas entradas y salidas</Typography>
        <List sx={{ bgcolor: "white", borderRadius: 2 }}>
          {historial.length === 0 ? (
            <Typography variant="body2" sx={{ p: 2 }}>No hay historial reciente.</Typography>
          ) : (
            historial.map((h, i) => (
              <div key={h.id_registro}>
                <ListItem>
                  <ExitToAppIcon sx={{ color: "#4caf50", mr: 1 }} />
                  <ListItemText
                    primary={h.vehiculo ? `${h.vehiculo.marca} ${h.vehiculo.modelo} (${h.vehiculo.placas || "Sin placas"})` : `Vehículo ID: ${h.id_vehiculo} (Sin información)`}
                    secondary={
                      <>
                        {`Entrada: ${new Date(h.fecha_entrada).toLocaleString()} | Salida: ${new Date(h.fecha_salida).toLocaleString()}`}
                        {h.usuario && ` | Dueño: ${h.usuario.nombres} ${h.usuario.apellido_paterno} ${h.usuario.apellido_materno}`}
                      </>
                    }
                  />
                  <CheckCircleIcon sx={{ color: "#4caf50" }} />
                </ListItem>
                {i < historial.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>

        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>📊 Espacios para motos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ bgcolor: "white", borderRadius: 2 }}>
              {['A', 'B'].map(zona => (
                <div key={zona}>
                  <ListItem>
                    <ListItemText
                      primary={`Estacionamiento ${zona}`}
                      secondary={`Disponibles: ${estadisticasEspacios[zona].libre} | Ocupados: ${estadisticasEspacios[zona].ocupado}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Espacios disponibles"
                      secondary={estadisticasEspacios[zona].disponibles.join(", ") || "Ninguno"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Espacios ocupados"
                      secondary={estadisticasEspacios[zona].ocupados.join(", ") || "Ninguno"}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>🚫 Infracciones registradas</Typography>
        <List sx={{ bgcolor: "white", borderRadius: 2 }}>
          {infracciones.length === 0 ? (
            <Typography variant="body2" sx={{ p: 2 }}>No hay infracciones registradas.</Typography>
          ) : (
            infracciones.map((inf, i) => (
              <div key={inf.id_infraccion}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={inf.vehiculo ? `${inf.vehiculo.marca} ${inf.vehiculo.modelo} (${inf.vehiculo.placas || "Sin placas"})` : `Vehículo ID: ${inf.id_vehiculo}`}
                    secondary={
                      <>
                        {`Motivo: ${inf.motivo}`}<br />
                        {`Fecha: ${new Date(inf.fecha).toLocaleString()}`}
                        {inf.usuario && ` | Dueño: ${inf.usuario.nombres} ${inf.usuario.apellido_paterno} ${inf.usuario.apellido_materno}`}
                      </>
                    }
                  />
                  <Button size="small" variant="outlined" color="success" onClick={() => eliminarInfraccion(inf.id_infraccion, inf.id_vehiculo)}>
                    Rehabilitar
                  </Button>
                </ListItem>
                {i < infracciones.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>
      </Box>
      <NavegationBarPolicia />
    </Container>
  );
};

export default EntradaSalidas;
