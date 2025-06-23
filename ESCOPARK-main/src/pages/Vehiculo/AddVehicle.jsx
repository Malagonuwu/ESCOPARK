import { useState } from "react";
import { 
  Box, Button, TextField, Avatar, Typography, 
  MenuItem, FormControl, InputLabel, Select 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

const AddVehicle = () => {
  const navigate = useNavigate();
  const session = useSession();

  const [form, setForm] = useState({
    Tipo_Vehiculo: "",
    Marca: "",
    Modelo: "",
    Placas: "",
    Color: "",
    Caracteristicas: "",
    Foto_Vehiculo: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, Foto_Vehiculo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userID = session?.user?.id;
      if (!userID) {
        alert("Usuario no autenticado.");
        return;
      }

      let fotoUrl = null;

      if (form.Foto_Vehiculo) {
        const fileExt = form.Foto_Vehiculo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `vehiculos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("vehiculos")
          .upload(filePath, form.Foto_Vehiculo);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("vehiculos")
          .getPublicUrl(filePath);

        fotoUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("vehiculos")
        .insert([
          {
            id_usuario: userID,
            tipo_vehiculo: form.Tipo_Vehiculo,
            marca: form.Marca,
            modelo: form.Modelo,
            placas: form.Placas,
            color: form.Color,
            caracteristicas: form.Caracteristicas,
            foto_vehiculo: fotoUrl,
          },
        ]);

      if (insertError) throw insertError;

      navigate("/vehiculos");

    } catch (error) {
      console.error("Error al guardar vehículo:", error.message);
      alert("Hubo un error al guardar el vehículo.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      
      <FormControl required>
        <InputLabel id="tipo-vehiculo-label">Tipo de Vehículo</InputLabel>
        <Select
          labelId="tipo-vehiculo-label"
          name="Tipo_Vehiculo"
          value={form.Tipo_Vehiculo}
          label="Tipo de Vehículo"
          onChange={handleChange}
        >
          <MenuItem value="Auto">Auto</MenuItem>
          <MenuItem value="Moto">Moto</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Marca" name="Marca" value={form.Marca} onChange={handleChange} required />
      <TextField label="Modelo" name="Modelo" value={form.Modelo} onChange={handleChange} required />
      <TextField label="Placas" name="Placas" value={form.Placas} onChange={handleChange} required />
      <TextField label="Color" name="Color" value={form.Color} onChange={handleChange} required />
      <TextField
        label="Características"
        name="Caracteristicas"
        value={form.Caracteristicas}
        onChange={handleChange}
        multiline
        rows={3}
      />

      {/* Carga de imagen */}
      <Box>
        <Typography variant="body2" mb={1}>Foto del Vehículo (opcional):</Typography>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {form.Foto_Vehiculo && (
          <Box mt={1}>
            <Avatar
              variant="rounded"
              src={URL.createObjectURL(form.Foto_Vehiculo)}
              sx={{ width: 100, height: 80 }}
            />
            <Typography variant="caption">{form.Foto_Vehiculo.name}</Typography>
          </Box>
        )}
      </Box>

      {/* Botones */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained">Guardar</Button>
        <Button variant="outlined" onClick={() => navigate("/vehiculos")}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default AddVehicle;
