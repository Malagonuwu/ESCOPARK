import { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Card, 
  Avatar, 
  IconButton, 
  TextField, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DirectionsCar, TwoWheeler, CameraAlt } from "@mui/icons-material";
import { supabase } from "../../supabaseClient";

// Componentes
import CustomButton from "../../components/General/CustomButton";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
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
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        backgroundColor: "white"
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        p: 3, 
        textAlign: "center",
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Typography color="error">{error}</Typography>
        <CustomButton 
          name="Volver a Vehículos"
          onClick={() => navigate("/vehiculos")}
          sx={{ mt: 2 }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: "80%", 
      position: "relative", 
      top: "70px", 
      left: "10%",
      mb: 4
    }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
          border: "0.5px solid",
          borderColor: "grey.300",
          boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.65)",
          overflow: "visible",
          pt: 6,
        }}
      >
        {/* Foto vehículo + botón para cambiar */}
        <Box sx={{ position: "absolute", top: -50 }}>
          <Avatar
            src={form.foto_vehiculo}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "grey.100"
            }}
            variant="rounded"
          >
            {!form.foto_vehiculo && getVehicleIcon(form.tipo_vehiculo)}
          </Avatar>
          <IconButton
            sx={{
              position: "absolute",
              bottom: -8,
              right: -1,
              backgroundColor: "#002250",
              width: 38,
              height: 38,
              border: "2.5px solid white",
              "&:hover": {
                backgroundColor: "#0090A4",
              },
            }}
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CameraAlt sx={{ color: "white", fontSize: 20 }} />
            )}
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFotoChange}
            style={{ display: "none" }}
          />
        </Box>

        {/* Campos del formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            px: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Audiowide', sans-serif",
              mb: 2,
              textAlign: "center"
            }}
          >
            Editando: {form.marca} {form.modelo}
          </Typography>

          {[
            {
              label: "Placas",
              name: "placas",
              value: form.placas,
              placeholder: "Ejemplo: XYZ-1234"
            },
            {
              label: "Marca",
              name: "marca",
              value: form.marca,
              placeholder: "Marca"
            },
            {
              label: "Modelo",
              name: "modelo",
              value: form.modelo,
              placeholder: "Modelo"
            },
            {
              label: "Color",
              name: "color",
              value: form.color,
              placeholder: "Color"
            },
            {
              label: "Características",
              name: "caracteristicas",
              value: form.caracteristicas,
              placeholder: "Características especiales",
              multiline: true,
              rows: 3
            }
          ].map((field) => (
            <Box key={field.name} sx={{ mb: 2, width: "100%", maxWidth: "250px" }}>
              <Typography
                sx={{
                  fontFamily: "'Audiowide', sans-serif",
                  fontSize: 12,
                  color: "#1e1e1e",
                }}
              >
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                placeholder={field.placeholder}
                variant="outlined"
                size="small"
                value={field.value}
                onChange={handleChange}
                fullWidth
                multiline={field.multiline}
                rows={field.rows}
                InputProps={{
                  sx: {
                    fontFamily: "Inter-Regular, Helvetica",
                    fontSize: 12,
                    color: "#00000066",
                  },
                }}
              />
            </Box>
          ))}

          {/* Select de tipo */}
          <Box sx={{ mb: 2, width: "100%", maxWidth: "250px" }}>
            <Typography
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 12,
                color: "#1e1e1e",
              }}
            >
              Tipo de vehículo
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                name="tipo_vehiculo"
                value={form.tipo_vehiculo}
                onChange={handleChange}
                sx={{
                  fontFamily: "Inter-Regular, Helvetica",
                  fontSize: 12,
                  color: form.tipo_vehiculo ? "#000" : "#00000066",
                }}
              >
                <MenuItem value="">
                  <em>Selecciona tipo</em>
                </MenuItem>
                <MenuItem value="Auto">Auto</MenuItem>
                <MenuItem value="Moto">Moto</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 3 }}>
            <CustomButton
              name="Cancelar"
              onClick={() => navigate("/vehiculos")}
              sx={{
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                "&:hover": { bgcolor: "grey" },
              }}
            />
            <CustomButton
              name={loading ? "Guardando..." : "Guardar"}
              type="submit"
              disabled={loading}
              sx={{
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                backgroundColor: "#002250",
                "&:hover": { bgcolor: "#0090a4" },
              }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EditVehicle;