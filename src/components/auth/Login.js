//Firebase
import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import auth from "../../firebase.config";

//Material Ui
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LoginButton } from "../../mui/homeStyled";

// Redux
import { connect } from "react-redux";
import DisplayUser from "./DisplayUser";

// React Router
import { Link } from "react-router-dom";

const Login = ({ loggedInAuth, login }) => {
  const handleLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  };

  if (loggedInAuth.isLoggedIn)
    return (
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <DisplayUser
          displayName={loggedInAuth.user.displayName}
          avatar={loggedInAuth.user.photoURL}
        />
      </Link>
    );
  return (
    <LoginButton
      variant="contained"
      startIcon={<GitHubIcon />}
      color="github"
      size="large"
      disableElevation
      onClick={() => handleLogin()}
    >
      Would You like To Join?
    </LoginButton>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInAuth: state.authReducer,
  };
};

export default connect(mapStateToProps, null)(Login);
