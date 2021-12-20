import { useState, useEffect } from "react";
// Components
import Nav from "../components/layout/Nav";
import Loading from "../components/Loading";

// Framer Motion
import { motion } from "framer-motion";

// Redux
import { connect } from "react-redux";
import { addAnswer } from "../redux/answersSlices/answersSlice";

// React Routers
import { useParams } from "react-router-dom";

// Material UI
import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
  GridORBox,
  QuestionContainer,
  QuestionAnswerButton,
  QuestionAnswerFlag,
  QuesitonCreatedBy,
} from "../mui/singleQuestionStyled";

// Firebase
import { setDoc, doc } from "firebase/firestore";
import { appFirestore } from "../firebase.config";
import DisplayUser from "../components/auth/DisplayUser";

import { addNotification } from "../redux/notificationSlices/notificationSlice";

const SingleQuestion = ({
  questions,
  auth,
  addAnswer,
  answers,
  addNotification,
}) => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState("");

  useEffect(() => {
    let questionIndex = questions.questions.findIndex(
      (question) => question.id == id
    );

    if (questionIndex > -1) {
      setQuestion(questions.questions[questionIndex]);
    }
  }, [questions]);

  useEffect(() => {
    if (Object.keys(question).length != 0) {
      if (answers.answers[`${auth.user.uid}_${question.id}`] !== undefined) {
        setIsAnswered(
          answers.answers[`${auth.user.uid}_${question.id}`].option
        );
      }
      setIsLoading(false);
    }
  }, [question]);

  const handleAnswer = (option) => {
    setIsAnswered(option);

    const authRef = doc(appFirestore, "users", auth.user.uid);
    const answerCollectionRef = doc(
      appFirestore,
      "answers",
      `${auth.user.uid}_${id}`
    );
    setDoc(answerCollectionRef, {
      user: authRef,
      option,
    })
      .then(() => {
        addAnswer({
          id: `${auth.user.uid}_${question.id}`,
          content: { option, user: auth.user },
        });
        addNotification({ message: "Answer Added", mode: "success" });
        console.log("Answer Added");
      })
      .catch(() => {
        addNotification({ message: "Something Went Wrong", mode: "error" });
        setIsAnswered("");
      });
  };

  if (isLoading) return <Loading />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Nav />
      {isAnswered ? (
        <AnsweredQuestion question={question} answer={isAnswered} />
      ) : (
        <UnAnsweredQuestion question={question} handleAnswer={handleAnswer} />
      )}
    </motion.div>
  );
};

const UnAnsweredQuestion = ({ question, handleAnswer }) => {
  return (
    <>
      <QuestionContainer>
        <Grid container spacing={2} sx={{ position: "relative" }}>
          <GridORBox>OR</GridORBox>
          <Grid item xs={12} sm={6}>
            <AnswerButton
              color="optionOne"
              txt={question?.optionOne}
              handleClick={handleAnswer}
              option="optionOne"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AnswerButton
              color="optionTwo"
              txt={question?.optionTwo}
              handleClick={handleAnswer}
              option="optionTwo"
            />
          </Grid>
        </Grid>
        <CreatedBy question={question} />
      </QuestionContainer>
    </>
  );
};

const AnsweredQuestion = ({ question, answer }) => {
  return (
    <>
      <QuestionContainer>
        <Grid container spacing={2} sx={{ position: "relative" }}>
          <GridORBox>OR</GridORBox>
          <Grid item xs={12} sm={6}>
            <AnswerButton
              color={answer == "optionOne" ? "answered" : "optionOne"}
              txt={question?.optionOne}
              handleClick={() => {}}
              option=""
              answer={answer == "optionOne" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AnswerButton
              color={answer == "optionTwo" ? "answered" : "optionTwo"}
              txt={question?.optionTwo}
              handleClick={() => {}}
              option=""
              answer={answer == "optionTwo" ? true : false}
            />
          </Grid>
        </Grid>
        <CreatedBy question={question} />
      </QuestionContainer>
    </>
  );
};

const AnswerButton = ({ color, txt, handleClick, option, answer = false }) => {
  return (
    <QuestionAnswerButton
      variant="contained"
      fullWidth
      color={color}
      onClick={() => handleClick(option)}
    >
      {answer && <AnsweredFlag />}
      {txt}
    </QuestionAnswerButton>
  );
};

const AnsweredFlag = () => {
  return (
    <>
      <QuestionAnswerFlag>Your Answer</QuestionAnswerFlag>
    </>
  );
};

const CreatedBy = ({ question }) => {
  return (
    <QuesitonCreatedBy>
      Created by :
      <DisplayUser
        displayName={question.user.displayName}
        avatar={question.user.photoURL}
        color="#979797"
        sx={{ marginLeft: "8px" }}
      />
    </QuesitonCreatedBy>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questionsReducer,
    auth: state.authReducer,
    answers: state.answersReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: (answer) => dispatch(addAnswer(answer)),
    addNotification: (data) => dispatch(addNotification(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestion);
