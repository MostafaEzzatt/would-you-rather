// Components
import DisplayUser from "../auth/DisplayUser";

// Material UI
import Box from "@mui/material/Box";
import { useSingleQuestionStyles } from "../../mui/makeStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { QuestionItemBox } from "../../mui/questionsStyled";

// React Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const QuestionItem = ({ question, auth, answers }) => {
  const classes = useSingleQuestionStyles();

  return (
    <QuestionItemBox
      className={classes.xsFullWidth}
      component={Link}
      to={`/question/${question.id}`}
      sx={{
        backgroundColor: answers.answers[`${auth.user.uid}_${question.id}`]
          ? "#3345A4"
          : "#fff",
      }}
    >
      <DisplayUser
        displayName={question.user?.displayName}
        avatar={question.user?.photoURL}
        size={24}
        sx={{ marginLeft: { xs: "-24px", sm: "0px" } }}
        fontWeight="bold"
        color={
          answers.answers[`${auth.user.uid}_${question.id}`]
            ? "#E0E0E0"
            : "#2B2B2B"
        }
      />

      <ArrowForwardIcon
        style={{
          color: answers.answers[`${auth.user.uid}_${question.id}`]
            ? "#E0E0E0"
            : "#2B2B2B",
        }}
      />

      <Typography
        sx={{
          color: answers.answers[`${auth.user.uid}_${question.id}`]
            ? "#fff"
            : "#3345A4",
        }}
      >
        Would You Rather
      </Typography>
    </QuestionItemBox>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    answers: state.answersReducer,
  };
};

export default connect(mapStateToProps, null)(QuestionItem);
