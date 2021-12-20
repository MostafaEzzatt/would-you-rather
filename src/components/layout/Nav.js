// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";

// React Router
import { Link } from "react-router-dom";

// Assets
import LogoVertical from "./../../assets/svgs/logo-small.svg";
import LogoSmall from "./../../assets/svgs/logo-vertical.svg";

// Components
import Login from "../auth/Login";

// Redux
import { connect } from "react-redux";
import { addNotification } from "../../redux/notificationSlices/notificationSlice";
import { logOut } from "../../redux/authSlice/authSlice";

//Firebase
import { getAuth, signOut } from "firebase/auth";

const Nav = ({ auth, addNotification, logOut }) => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        addNotification({ message: "We Will Miss you", mode: "info" });
        logOut();
      })
      .catch(() => {
        addNotification({
          message: "Something Went Wrong Please Try Again",
          mode: "error",
        });
      });
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Container>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <LogoVertical />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <LogoSmall />
                </Box>
              </Link>

              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Login />
                <Link to="/questions">
                  <Typography sx={{ color: "black" }}>
                    {<QuestionMarkIcon />}
                  </Typography>
                </Link>
                <Link to="/leaderboard">
                  <Typography sx={{ color: "black" }}>
                    {<MilitaryTechIcon />}
                  </Typography>
                </Link>
                <Link to="/add">
                  <Typography sx={{ color: "black" }}>
                    {auth.isLoggedIn && <AddBoxIcon />}
                  </Typography>
                </Link>
                {auth.isLoggedIn && (
                  <Button onClick={() => handleSignOut()}>
                    <Typography sx={{ color: "black" }}>
                      <ExitToAppIcon />
                    </Typography>
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNotification: (data) => dispatch(addNotification(data)),
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
