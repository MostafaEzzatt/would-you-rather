import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const ContainerBox = styled(Box, {
  name: "ContainerBox",
  slot: "main",
})({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
});

export const LoginButton = styled(Button, {
  name: "LoginButton",
  slot: "login",
})({
  fontSize: "14px",
  fontWeight: "Medium",
  textTransform: "capitalize",
});
