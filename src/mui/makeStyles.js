import { makeStyles } from "@mui/styles";

export const useAddQuestionInputStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "#f8f8f8",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "#fff",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#f8f8f8",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
}));

export const useSingleQuestionStyles = makeStyles((theme) => ({
  xsFullWidth: {
    width: "calc(100% - 12px)",
  },
}));
