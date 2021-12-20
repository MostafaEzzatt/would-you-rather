import { useState, useEffect } from "react";

// Components
import Loading from "../components/Loading";
import Nav from "../components/layout/Nav";
import QuestionList from "../components/question/QuestionList";

// Redux
import { connect } from "react-redux";

// Framer Motions
import { motion } from "framer-motion";

// Material UI
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const Profile = ({ auth, questions }) => {
  const [authQuestionsList, setAuthQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authQuestions = questions.filter(
      (question) => question.user.uid == auth.uid
    );
    setAuthQuestionsList(authQuestions);
    setIsLoading(false);
  }, [questions]);

  if (isLoading) return <Loading />;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Nav />

        <Container sx={{ marginTop: "25px" }}>
          <Typography variant="h6" color="#2B2B2B">
            Your Questions
          </Typography>
        </Container>
        <QuestionList questions={{ questions: authQuestionsList }} />
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer.user,
    questions: state.questionsReducer.allQuestions,
  };
};

export default connect(mapStateToProps, null)(Profile);
