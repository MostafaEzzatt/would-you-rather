//Material Ui
import { TextField } from "@mui/material";
import { useAddQuestionInputStyles } from "../mui/makeStyles";

const CustomeInput = ({ value, handleChange, label }) => {
  const classes = useAddQuestionInputStyles();
  return (
    <TextField
      label={label}
      variant="filled"
      className={classes.root}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      fullWidth
    />
  );
};

export default CustomeInput;
