//Redux
import { useEffect } from "react";
import { connect } from "react-redux";

//React Router
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ auth, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
      return "";
    }
  }, []);
  return children;
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, null)(RequireAuth);
