import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const Input = styled("input")({
  display: "none",
});

const useProfileInfo = makeStyles({
  profileHeader: {
    display: "flex",
    alignItems: "center",
    marginTop: "54px",
    gap: "10px",
  },
});

const ProfileHeader = () => {
  const classes = useProfileInfo();
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box className={classes.profileHeader}>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              size="large"
            >
              <PhotoCamera />
            </IconButton>
          </label>

          <Typography variant="h4" component="h2">
            Mostafa Ezzat
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ProfileHeader;
