import { Box, Typography } from "@mui/material";

const ProfileInfoItem = ({ icon, label, value }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      {icon}
      <Typography
        variant="subtitle2"
        color="grey.700"
        fontWeight={600}
        sx={{ ml: 1 }}
      >
        {label ? (
          <>
            {label}:{" "}
            <Typography
              component="span"
              variant="subtitle2"
              color="grey.700"
              fontWeight={400}
            >
              {value}
            </Typography>
          </>
        ) : (
          value
        )}
      </Typography>
    </Box>
  );
};

export default ProfileInfoItem;
