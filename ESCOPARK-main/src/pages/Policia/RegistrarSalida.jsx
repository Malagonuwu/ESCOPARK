import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../../components/General/Header";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const RegistrarSalida = () => {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [editRegistro, setEditRegistro] = useState(null);
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    const { data, error } = await supabase
      .from("registros")
      .select("id_registro, codigo_acceso, fecha_entrada, id_espacio")
      .eq("tipo_registro", "Entrada")
      .is("fecha_salida", null);

    if (!error) setRegistros(data);
  };

  const registrarSalida = async (id) => {
    const registro = registros.find((r) => r.id_registro === id);

    const updates = [];

    updates.push(
      supabase
        .from("registros")
        .update({ fecha_salida: new Date().toISOString(), tipo_registro: "Salida" })
        .eq("id_registro", id)
    );

    if (registro.id_espacio) {
      updates.push(
        supabase
          .from("espacios")
          .update({ estado: "Libre" })
          .eq("id_espacio", registro.id_espacio)
      );
    }

    const [updateError, espacioError] = await Promise.all(updates);

    if (!updateError.error && (!espacioError || !espacioError.error)) {
      setRegistros((prev) => prev.filter((r) => r.id_registro !== id));
    }
  };

  const eliminarRegistro = async (id) => {
    const { error } = await supabase.from("registros").delete().eq("id_registro", id);
    if (!error) {
      setRegistros((prev) => prev.filter((r) => r.id_registro !== id));
    }
  };

  const abrirEditar = (registro) => {
    setEditRegistro(registro);
    setNuevoCodigo(registro.codigo_acceso);
  };

  const guardarEdicion = async () => {
    if (!nuevoCodigo.trim()) return alert("El código no puede estar vacío.");

    const { data: codigoExistente } = await supabase
      .from("registros")
      .select("id_registro")
      .eq("codigo_acceso", nuevoCodigo.trim())
      .is("fecha_salida", null)
      .single();

    if (codigoExistente && codigoExistente.id_registro !== editRegistro.id_registro) {
      return alert("El código ya está en uso por otro registro activo.");
    }

    const { error } = await supabase
      .from("registros")
      .update({ codigo_acceso: nuevoCodigo.trim() })
      .eq("id_registro", editRegistro.id_registro);

    if (!error) {
      setRegistros((prev) =>
        prev.map((r) =>
          r.id_registro === editRegistro.id_registro ? { ...r, codigo_acceso: nuevoCodigo.trim() } : r
        )
      );
      setEditRegistro(null);
      setNuevoCodigo("");
    }
  };

  const registrosFiltrados = registros.filter((r) =>
    r.codigo_acceso.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Container sx={{ maxWidth: 412 }}>
      <Header sectionTitle="Registrar Salida" userName="Policía" />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            variant="outlined"
            label="Buscar código"
            size="small"
            fullWidth
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>

        {registrosFiltrados.length === 0 ? (
          <Typography>No hay códigos activos que mostrar.</Typography>
        ) : (
          registrosFiltrados.map((r) => (
            <Box
              key={r.id_registro}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography>
                <strong>Código:</strong> {r.codigo_acceso}
              </Typography>
              <Typography>
                <strong>Entrada:</strong> {new Date(r.fecha_entrada).toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" variant="outlined" onClick={() => abrirEditar(r)}>
                  Editar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => registrarSalida(r.id_registro)}
                >
                  Registrar Salida
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => eliminarRegistro(r.id_registro)}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          ))
        )}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{ mt: 4 }}
          onClick={() => navigate("/home-policia")}
        >
          Volver al inicio
        </Button>
      </Box>

      <Dialog open={!!editRegistro} onClose={() => setEditRegistro(null)}>
        <DialogTitle>Editar Código</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Código"
            value={nuevoCodigo}
            onChange={(e) => setNuevoCodigo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRegistro(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarEdicion}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RegistrarSalida;
