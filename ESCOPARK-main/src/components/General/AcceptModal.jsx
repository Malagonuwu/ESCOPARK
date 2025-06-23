import { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

//imagenes
import greet from "../../assets/greet.png";

const AcceptModal = ({
  title = null,
  description = null,
  showDescription = true,
  showImage = true,
  label = null,
  onConfirm = () => {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        ml: 15,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "70%",
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
                  bgcolor: "#002250",
                  textTransform: "none",
                  width: 100,
                  height: 35,
                  fontSize: 12,
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "#000",
                  },
                }}
              >
                {label}
              </Button>
            </Stack>
          </Stack>

          {showImage && (
            <Box>
              <Box component="img" src={greet} sx={{ width: 119 }} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AcceptModal;
