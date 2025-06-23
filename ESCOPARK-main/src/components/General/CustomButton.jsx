import { Button as MuiButton } from "@mui/material";
import { Link } from "react-router-dom";

const CustomButton = ({
  to = null,
  onClick = null,
  name,
  fullWidth = false,
  variant = "contained",
  disabled = false,
  sx = {},
}) => {
  const defaultStyles = {
    bgcolor: "#08001b",
    fontWeight: 700,
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 15,
    height: 40,
    mb: 1,
    color: "white",
    "&:hover": {
      bgcolor: "#770275",
    },
  };

  const button = (
    <MuiButton
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      sx={{ ...defaultStyles, ...sx }}
    >
      {name}
    </MuiButton>
  );

  return to ? (
    <Link to={to} style={{ textDecoration: "none" }}>
      {button}
    </Link>
  ) : (
    button
  );
};

export default CustomButton;
