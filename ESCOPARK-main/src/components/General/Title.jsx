import { Typography } from "@mui/material";

const PageTitle = ({ text = "REGISTRO", sx = {} }) => {
  return (
    <Typography
      variant="h1"
      sx={{
        position: "absolute",
        fontFamily: "Orbitron, sans-serif",
        fontWeight: 900,
        color: "white",
        fontSize: "30px",
        WebkitTextStroke: "1.5px #770275",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default PageTitle;
