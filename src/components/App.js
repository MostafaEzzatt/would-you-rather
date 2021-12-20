import { useState, useEffect } from "react";

// Components
import Loading from "./Loading";
import ToastPortal from "./notification/ToastPortal";

//Firebase
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import auth, { appFirestore } from "../firebase.config";

//Redux
import { connect } from "react-redux";
import { login } from "../redux/authSlice/authSlice";
import {
  asyncGetAllQuestions,
  asyncGetQuestionUser,
} from "../redux/questionsSlices/questionSlice";
import { getAllAnswers } from "../redux/answersSlices/answersSlice";
import { getAllUsers } from "../redux/usersSlices/usersSlice";
import { addNotification } from "../redux/notificationSlices/notificationSlice";

//React Router
import { useRoutes, useLocation } from "react-router-dom";

// App Routes
import appRoutes from "../allRoutes";

// Framer Motion
import { AnimatePresence } from "framer-motion";

const App = ({
  login,
  asyncGetAllQuestions,
  asyncGetQuestionUser,
  getAllUsers,
  getAllAnswers,
  addNotification,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const appRoutesElem = useRoutes(appRoutes);
  const location = useLocation();

  useEffect(() => {
    const unSubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        login({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    });

    getRedirectResult(auth).then((result) => {
      if (result) {
        console.log("only evoke when sign in");
        const ref = doc(appFirestore, "users", result.user.uid);
        setDoc(
          ref,
          {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
          },
          { merge: true }
        );
      }
    });

    asyncGetAllQuestions()
      .then(() => {
        return asyncGetQuestionUser();
      })
      .then(() => {
        return getAllAnswers();
      })
      .then(() => {
        return getAllUsers();
      })
      .then(() => setIsLoading(false))
      .catch(() => {
        addNotification({
          message: "Something Went Wrong Please Refresh The Page",
          mode: "error",
        });
      });

    return () => {
      unSubAuth();
    };
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <div key={location.pathname}>{appRoutesElem}</div>
      </AnimatePresence>
      <ToastPortal />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    asyncGetAllQuestions: () => dispatch(asyncGetAllQuestions()),
    asyncGetQuestionUser: () => dispatch(asyncGetQuestionUser()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllAnswers: () => dispatch(getAllAnswers()),
    calcUsersScore: (data) => dispatch(calcUsersScore(data)),
    addNotification: (data) => dispatch(addNotification(data)),
  };
};
export default connect(null, mapDispatchToProps)(App);
