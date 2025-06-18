import { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

//imagenes
import sad from "../../assets/sad.png";
import happy from "../../assets/happy.png";

const WarningModal = ({
  title = null,
  description = null,
  showDescription = true,
  showImage = true,
  confirmText = null,
  cancelText = "Cancelar",
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const [hoveringCancel, setHoveringCancel] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        ml: 2,
        //textAlign: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "80%",
          borderRadius: "20px",
          pl: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Stack spacing={2} justifyContent="space-between" sx={{ flex: 1 }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.3px",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Typography>

              {showDescription && (
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "grey.700",
                    letterSpacing: "-0.3px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={onConfirm}
                sx={{
                  bgcolor: "#d32f2f",
                  textTransform: "none",
                  width: 100,
                  height: 35,
                  fontSize: 12,
                  "&:hover": {
                    bgcolor: "#b71c1c",
                  },
                }}
              >
                {confirmText}
              </Button>

              <Button
                variant="contained"
                onClick={onCancel}
                onMouseEnter={() => setHoveringCancel(true)}
                onMouseLeave={() => setHoveringCancel(false)}
                sx={{
                  bgcolor: "#002250",
                  textTransform: "none",
                  width: 100,
                  height: 35,
                  fontSize: 12,
                  "&:hover": {
                    bgcolor: "#000f33",
                  },
                }}
              >
                {cancelText}
              </Button>
            </Stack>
          </Stack>

          {showImage && (
            <Box>
              <Box
                component="img"
                src={hoveringCancel ? happy : sad}
                sx={{ width: 119 }}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default WarningModal;
