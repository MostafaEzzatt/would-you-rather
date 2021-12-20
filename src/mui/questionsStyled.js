import { styled } from "@mui/system";
import { Box } from "@mui/system";

export const QuestionItemBox = styled(Box, {
  name: "QuestionItemBox",
  slot: "main",
})({
  borderRadius: "4px",
  paddingTop: "14px",
  paddingBottom: "14px",
  paddingLeft: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  textDecoration: "none",
});
