import { useState } from "react";

// Components
import Nav from "../components/layout/Nav";
import CustomeInput from "../components/CustomeInput";

// Framer Motion
import { motion } from "framer-motion";

// Material UI
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";

// Redux
import { connect } from "react-redux";
import { addQuestions } from "../redux/questionsSlices/questionSlice";
import { addNotification } from "../redux/notificationSlices/notificationSlice";

// Firebase
import {
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { appFirestore } from "../firebase.config";

const AddQuestion = ({ auth, addQuestion, addNotification }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const checkQuestion = async () => {
    const collectionRef = collection(appFirestore, "questions");
    const queryRef = query(
      collectionRef,
      where("optionOne", "==", optionOne),
      where("optionTwo", "==", optionTwo),
      limit(1)
    );
    const allQuestions = await getDocs(queryRef);
    return allQuestions.size;
  };

  const handleSubmit = () => {
    if (optionOne && optionTwo && auth.isLoggedIn) {
      const userRef = doc(appFirestore, "users", auth.user.uid);
      const questionRef = collection(appFirestore, "questions");
      checkQuestion().then((size) => {
        if (size == 0) {
          addDoc(questionRef, {
            optionOne,
            optionTwo,
            user: userRef,
          })
            .then(() => {
              let questionObj = {
                optionOne,
                optionTwo,
                user: { ...auth.user },
              };
              addQuestion(questionObj);
              addNotification({
                message: "Your Question Added :)",
                mode: "success",
              });
            })
            .catch(() => {
              addNotification({
                message: "Something Went Wrong",
                mode: "error",
              });
            });
        } else {
          addNotification({
            message: "This Question Already exist",
            mode: "error",
          });
        }
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Nav />

      <Container sx={{ marginTop: "25px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CustomeInput
              label="Option One"
              value={optionOne}
              handleChange={setOptionOne}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomeInput
              label="Option Two"
              value={optionTwo}
              handleChange={setOptionTwo}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Add Your Question
            </Button>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(addQuestions(question)),
    addNotification: (data) => dispatch(addNotification(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
