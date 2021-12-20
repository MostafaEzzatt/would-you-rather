import { Link } from "react-router-dom";

//Material Ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ContainerBox } from "../mui/homeStyled";

// Components
import Login from "../components/auth/Login";

//Assets
import Logo from "../assets/svgs/logo.svg";

//Redux
import { connect } from "react-redux";

//Framer Motion
import { motion } from "framer-motion";

const Home = ({ auth }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ContainerBox>
          <Logo />
          <Divider sx={{ width: "294px", marginBottom: "25px" }} />
          <Login />
          <Button
            to="/questions"
            component={Link}
            sx={{ marginTop: "8px", textTransform: "capitalize" }}
          >
            {auth.isLoggedIn ? "" : "or"}see the questions{" "}
            {auth.isLoggedIn ? <ArrowForwardIcon /> : ""}
          </Button>
        </ContainerBox>
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, null)(Home);
