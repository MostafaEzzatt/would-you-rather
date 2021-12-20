// Material UI
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const DisplayUser = ({
  displayName,
  avatar,
  size = 40,
  sx = {},
  fontWeight = "medium",
  color = "#2B2B2B",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: color,
        ...sx,
      }}
    >
      <Avatar
        alt={displayName}
        src={avatar}
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
      <Typography
        component="span"
        sx={{ fontWeight: `${fontWeight}` }}
        variant="subtitle1"
      >
        {displayName}
      </Typography>
    </Box>
  );
};

export default DisplayUser;
