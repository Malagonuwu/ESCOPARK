import { Box, TextField, Typography } from "@mui/material";

const EmailField = ({ correo, setCorreo, errorCorreo, setErrorCorreo }) => {
  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    const correoValido = /^[\w-.]+@alumno\.ipn\.mx$|^\d{10}$/;
    setErrorCorreo(!correoValido.test(value));
  };

  return (
    <Box
      sx={{ position: "absolute", width: "328px", top: "313px", left: "24px" }}
    >
      <Typography
        sx={{
          fontFamily: "Audiowide, sans-serif",
          fontSize: "13px",
          color: "white",
          mb: "2px",
        }}
      >
        Correo institucional o número de boleta
      </Typography>
      <TextField
        fullWidth
        value={correo}
        onChange={handleCorreoChange}
        placeholder="Ingrese un correo o boleta válidos"
        error={errorCorreo}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "34px",
            bgcolor: "white",
            "& input": {
              padding: "8px 16px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "grey",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#770275",
              borderWidth: "2px",
            },
          },
        }}
      />
      {errorCorreo && (
        <Typography sx={{ mt: "2px", fontSize: "10.5px", color: "#ffa4fd" }}>
          Correo institucional no válido
        </Typography>
      )}
    </Box>
  );
};

export default EmailField;
