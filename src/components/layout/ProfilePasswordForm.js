import { useState } from "react";

//Materials Ui
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const useFieldForm = makeStyles({
  textField: {
    width: "300px",
    marginTop: "10px",
  },
  spaceY: {
    marginTop: "20px",
  },
  flexBox: {
    display: "flex",
    flexDirection: "column",
    m: 1,
  },
});

const ProfilePasswordForm = () => {
  const classess = useFieldForm();
  const [password, setPassword] = useState("");
  return (
    <Container
      className={classess.spaceY}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} component="form">
        <input type="text" hidden disabled autoComplete="uid" />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classess.textField}
          autoComplete="new-password"
          required
        />

        <Button
          variant="contained"
          size="medium"
          style={{ width: "max-content" }}
        >
          Update Password
        </Button>
      </Stack>
    </Container>
  );
};

export default ProfilePasswordForm;
