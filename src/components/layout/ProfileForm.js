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

const ProfileForm = () => {
  const classess = useFieldForm();
  const [fullName, setFullName] = useState("");
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
        <TextField
          label="Email"
          variant="filled"
          value={"mo@mail.com"}
          disabled
          className={classess.textField}
        />
        <TextField
          label="Fullname"
          variant="filled"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={classess.textField}
          required
        />

        <Button
          variant="contained"
          size="medium"
          style={{ width: "max-content" }}
        >
          Update
        </Button>
      </Stack>
    </Container>
  );
};

export default ProfileForm;
