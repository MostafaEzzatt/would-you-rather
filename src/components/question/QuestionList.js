// Components
import QuestionItem from "./QuestionItem";

// Material UI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const QuestionList = ({ questions }) => {
  return (
    <>
      <Container sx={{ marginTop: "25px" }}>
        <Grid container spacing={2}>
          {questions.questions.map((question) => {
            return (
              <Grid item xs={12} sm={6} key={question?.id}>
                <QuestionItem question={question} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default QuestionList;
