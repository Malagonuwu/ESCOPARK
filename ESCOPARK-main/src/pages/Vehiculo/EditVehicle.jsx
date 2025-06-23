import { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  CircularProgress,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DirectionsCar, TwoWheeler, Save, Cancel, AddAPhoto } from "@mui/icons-material";
import { supabase } from "../../supabaseClient";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    tipo_vehiculo: "",
    marca: "",
    modelo: "",
    placas: "",
    color: "",
    caracteristicas: "",
    foto_vehiculo: ""
  });

  // Obtener datos del vehículo
  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("vehiculos")
          .select("*")
          .eq("id_vehiculo", id)
          .single();

        if (error) throw error;

        if (data) {
          setForm({
            tipo_vehiculo: data.tipo_vehiculo || "",
            marca: data.marca || "",
            modelo: data.modelo || "",
            placas: data.placas || "",
            color: data.color || "",
            caracteristicas: data.caracteristicas || "",
            foto_vehiculo: data.foto_vehiculo || ""
          });
        } else {
          setError("Vehículo no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener vehículo:", error);
        setError("Error al cargar el vehículo");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Subir la nueva imagen
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}_${Date.now()}.${fileExt}`;
      const filePath = `vehiculos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehiculos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('vehiculos')
        .getPublicUrl(filePath);

      // Actualizar el estado del formulario
      setForm(prev => ({ ...prev, foto_vehiculo: publicUrl }));

    } catch (error) {
      console.error("Error al cambiar foto:", error);
      setError("Error al actualizar la foto");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('vehiculos')
        .update({
          tipo_vehiculo: form.tipo_vehiculo,
          marca: form.marca,
          modelo: form.modelo,
          placas: form.placas,
          color: form.color,
          caracteristicas: form.caracteristicas,
          foto_vehiculo: form.foto_vehiculo
        })
        .eq('id_vehiculo', id);

      if (error) throw error;

      navigate("/vehiculos", { state: { message: "Vehículo actualizado correctamente" } });
    } catch (error) {
      console.error("Error al actualizar vehículo:", error);
      setError("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  const getVehicleIcon = (tipo) => {
    switch (tipo) {
      case 'Auto':
        return <DirectionsCar sx={{ fontSize: 60 }} />;
      case 'Moto':
        return <TwoWheeler sx={{ fontSize: 60 }} />;
      default:
        return <DirectionsCar sx={{ fontSize: 60 }} />;
    }
  };

  if (loading && !form.tipo_vehiculo) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate("/vehiculos")}
        >
          Volver a Vehículos
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ position: "relative", mb: 2 }}>
            <Avatar
              variant="rounded"
              src={form.foto_vehiculo}
              sx={{ 
                width: 120, 
                height: 90, 
                bgcolor: "grey.100",
              }}
            >
              {!form.foto_vehiculo && getVehicleIcon(form.tipo_vehiculo)}
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
              {uploading ? <CircularProgress size={20} color="inherit" /> : <AddAPhoto fontSize="small" />}
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={handleFotoChange} 
              />
            </IconButton>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Editando: {form.marca} {form.modelo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Placas: {form.placas}
          </Typography>
        </CardContent>
      </Card>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth required>
          <InputLabel>Tipo de Vehículo</InputLabel>
          <Select
            name="tipo_vehiculo"
            value={form.tipo_vehiculo}
            onChange={handleChange}
            label="Tipo de Vehículo"
          >
            <MenuItem value="Auto">Auto</MenuItem>
            <MenuItem value="Moto">Moto</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Marca"
          name="marca"
          value={form.marca}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Modelo"
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Placas"
          name="placas"
          value={form.placas}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Color"
          name="color"
          value={form.color}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Características"
          name="caracteristicas"
          value={form.caracteristicas}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Guardar Cambios"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => navigate("/vehiculos")}
            fullWidth
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditVehicle;