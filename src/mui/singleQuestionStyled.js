import { styled, experimental_sx as sx } from "@mui/system";
import { Box, Button, Container } from "@mui/material";

export const GridORBox = styled(Box, {
  name: "GridORBox",
  slot: "or",
})({
  position: "absolute",
  top: "calc(50% + 8px)",
  left: "calc(50% + 8px)",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#0E0E0E",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "900",
  width: "70px",
  height: "70px",
  zIndex: 1000,
  textAlign: "center",
  lineHeight: "70px",
  borderRadius: "50%",
});

export const QuestionContainer = styled(Container, {
  name: "QuestionContainer",
  slot: "wrapper",
})({
  height: "calc(100vh - 64px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const QuestionAnswerButton = styled(Button, {
  name: "QuestionAnswerButton",
  slot: "btn",
})(
  sx({
    fontSize: "18px",
    height: { xs: "196px", md: "245px" },
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "capitalize",
    paddingX: "30px",
    position: "relative",
  })
);

export const QuestionAnswerFlag = styled(Box, {
  name: "QuestionAnswerFlag",
  slot: "wrapper",
})({
  backgroundColor: "#0E0E0E",
  color: "#fff",
  position: "absolute",
  top: "12px",
  left: "16px",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "14px",
});

export const QuesitonCreatedBy = styled(Box, {
  name: "QuesitonCreatedBy",
  slot: "wrapper",
})({
  display: "flex",
  alignItems: "center",
  color: "#b5b2b2",
  marginTop: "25px",
});
