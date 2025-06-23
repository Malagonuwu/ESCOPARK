import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordField = ({
  password,
  setPassword,
  errorPassword,
  setErrorPassword,
  showPassword,
  setShowPassword,
}) => {
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorPassword(value.length < 8);
  };

  return (
    <Box
      sx={{ position: "absolute", width: "291px", top: "393px", left: "24px" }}
    >
      <Typography
        sx={{
          fontFamily: "Audiowide, sans-serif",
          fontSize: "13px",
          color: "white",
          my: "2px",
        }}
      >
        Contraseña
      </Typography>
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Ingrese su contraseña"
        error={errorPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <VisibilityIcon sx={{ width: 20, height: 20 }} />
                ) : (
                  <VisibilityOffIcon sx={{ width: 20, height: 20 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
      {errorPassword && (
        <Typography sx={{ mt: "2px", fontSize: "10.5px", color: "#ffa4fd" }}>
          Contraseña incorrecta
        </Typography>
      )}
    </Box>
  );
};

export default PasswordField;
