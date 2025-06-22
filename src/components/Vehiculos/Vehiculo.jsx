import { Button, Typography, Avatar, Box } from "@mui/material";

const Vehículo = ({ avatar, label, placa, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: "grey.200",
        fontFamily: "Inter, Sans-serif",
        fontSize: "18px",
        width: "85%",
        height: 70,
        textTransform: "none",
        justifyContent: "flex-start",
        paddingX: 2,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          backgroundColor: "grey.200",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* Avatar */}
        <Avatar
          src={avatar}
          sx={{
            width: 50,
            height: 50,
          }}
        />

        {/* Nombre y placa */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginLeft: 2,
          }}
        >
          <Typography color="#002250" fontWeight="700">
            {label}
          </Typography>

          <Typography color="grey.500" fontWeight="400">
            {placa}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default Vehículo;
