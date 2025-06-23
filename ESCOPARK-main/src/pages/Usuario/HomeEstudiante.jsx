import { Box, Container, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Imagen
import fondo from "../../assets/Cel.jpg";

// Componentes
import Header from "../../components/General/Header";
import NavegationBar from "../../components/General/NavegationBar";

// Supabase
import { supabase } from "../../supabaseClient";

const Home = () => {
  const [userName, setUserName] = useState("Cargando...");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error al obtener el usuario:", authError);
          setUserName("Invitado");
          return;
        }

        const correo = user.email;

        // Obtener nombre del usuario y comprobante
        const { data, error } = await supabase
          .from("usuarios")
          .select("nombres, apellido_paterno, url_comprobante")
          .eq("correo_institucional", correo)
          .single();

        if (error) {
          console.error("Error al obtener datos del usuario:", error);
          setUserName("Usuario");
        } else {
          setUserName(`${data.nombres} ${data.apellido_paterno}`);
          if (data.url_comprobante) {
            // Añadir timestamp para evitar caché
            setPdfUrl(`${data.url_comprobante}?t=${Date.now()}`);
          }
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    // Validar que sea PDF
    if (selectedFile.type !== "application/pdf") {
      setFileError("Por favor, sube solo archivos PDF");
      return;
    }

    setUploading(true);
    setFileError(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Nombre de archivo seguro
      const fileName = selectedFile.name.replace(/\s+/g, "_");
      const filePath = `${user.id}/${Date.now()}_${fileName}`;

      // Subida al nuevo bucket "comprobantes"
      const { error: uploadError } = await supabase.storage
        .from("comprobantes")
        .upload(filePath, selectedFile, {
          contentType: "application/pdf",
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from("comprobantes")
        .getPublicUrl(filePath);

      // Actualizar en la tabla usuarios
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ url_comprobante: publicUrl })
        .eq("id_usuario", user.id);

      if (updateError) throw updateError;

      // Actualizar estado con nueva URL y limpiar selección
      setPdfUrl(`${publicUrl}?t=${Date.now()}`);
      setSelectedFile(null);
      
    } catch (error) {
      console.error("Error en upload:", error);
      setFileError(error.message || "Error al subir el archivo");
    } finally {
      setUploading(false);
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
      }}
    >
      {/* Header */}
      <Box>
        <Header
          sectionTitle="Inicio"
          userName={userName}
          showBackgroundImage={false}
          backgroundColor="#002250"
        />
      </Box>

      {/* Zona comprobante */}
      <Box sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comprobante de horario
        </Typography>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setFileError(null);
          }}
          style={{ display: 'block', marginBottom: '8px' }}
        />
        
        {fileError && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {fileError}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          sx={{ mt: 1 }}
        >
          {uploading ? "Subiendo..." : (pdfUrl ? "Actualizar comprobante" : "Subir comprobante")}
        </Button>

        {pdfUrl && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Comprobante actual:
            </Typography>
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&view=fitH`}
              width="100%"
              height="500px"
              title="Comprobante de horario"
              style={{ 
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Si no ves el PDF, <a href={pdfUrl} target="_blank" rel="noopener noreferrer">ábrelo en una nueva pestaña</a>
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navegación */}
      <NavegationBar />
    </Container>
  );
};

export default Home;